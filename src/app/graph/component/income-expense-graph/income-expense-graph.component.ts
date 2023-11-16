import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {GraphHttpService} from "../../services/graph-http.service";
import {PeriodsService} from "../../../shared/services/periods.service";
import {filter, map} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Chart, ChartEvent} from "chart.js/auto";
import {PositionType} from "../../../positions/model/Position";
import 'chartjs-adapter-date-fns';
import {formatDate} from "@angular/common";
import {ChartType} from "chart.js";
import {ObjectData} from "../../model/ObjectData";
import {intervalToDuration} from 'date-fns';

@Component({
  selector: 'app-income-expense-graph',
  templateUrl: './income-expense-graph.component.html',
  styleUrls: ['./income-expense-graph.component.scss']
})
export class IncomeExpenseGraphComponent implements OnDestroy {

  @Output() dataFilter = new EventEmitter<{ type?: PositionType, date?: string }>();
  private chart: Chart<ChartType, { x: string; y: number }[], unknown> | undefined;

  constructor(private graphHttpService: GraphHttpService,
              private periodsService: PeriodsService) {
    this.periodsService.selectedPeriod.pipe(
      takeUntilDestroyed(),
      filter(({start, end}) =>
        !!start && !!end &&
        (intervalToDuration({start: new Date(start), end: new Date(end)}).months || 0)  > 1)
    ).subscribe(({start, end}) => this.loadGraphicData(start, end));
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  loadGraphicData(beginDate: string, endDate: string) {
    this.graphHttpService.getIncomeExpenseData(beginDate, endDate)
      .pipe(
        map(value => value.data)
      )
      .subscribe(data => {
        this.chart?.destroy();
        const config = this.moreThanMonth(data) ? this.getOptions() : this.getMonthOptions(data);
        this.chart = new Chart('chart',
          {
            type: 'bar',
            data,
            // @ts-ignore
            options: this.getOptions()
          });
      });
  }

  private getOptions() {
    return {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month',
            tooltipFormat: 'MMMM',
            displayFormats: {month: 'MMMM'}
          },
        }
      },
      onClick: this.getOnClick()
    };
  }

  private getMonthOptions(data: ObjectData) {
    data.datasets.forEach(dataset => dataset.type = 'line');
    return {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {month: 'dd MMMM'}
          },
        }
      },
      onClick: this.getOnClick()
    };
  }

  private moreThanMonth(data: ObjectData): boolean {
    const dates = data.datasets
      .flatMap(dataset => dataset.data)
      .map(data => new Date(data.x))
      .sort();
    const duration = intervalToDuration({start: dates[0], end: dates[dates.length - 1]});
    return (duration.months || 0) > 0;
  }

  private getOnClick() {
    return (event: ChartEvent) => {
      const elements = this.chart?.getElementsAtEventForMode(event as any, 'point', {}, true);
      const date = new Date((this.chart?.data?.datasets?.at(elements?.[0]?.datasetIndex || 0)?.data?.at(elements?.[0]?.index || 0)?.x || ''));
      const type = (this.chart?.data?.datasets?.at(elements?.[0]?.datasetIndex || 0)?.label || "INCOME") as 'INCOME' | 'EXPENSE';
      this.dataFilter.emit({type: PositionType[type], date: formatDate(date, 'MMMM', 'en-US').toUpperCase()})
    };
  }

}
