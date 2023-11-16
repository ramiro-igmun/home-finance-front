import {Component, EventEmitter, Output} from '@angular/core';
import {Chart} from "chart.js/auto";
import {PositionType} from "../../../positions/model/Position";
import {GraphHttpService} from "../../services/graph-http.service";
import {PeriodsService} from "../../../shared/services/periods.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-category-expense-graph',
  templateUrl: './category-expense-graph.component.html',
  styleUrls: ['./category-expense-graph.component.scss']
})
export class CategoryExpenseGraphComponent {

  @Output() dataFilter = new EventEmitter<{type?: PositionType, date?: string}>();
  private chart: Chart<ChartType, { x: string; y: number }[], unknown> | undefined;

  constructor(private graphHttpService: GraphHttpService,
              private periodsService: PeriodsService) {
    this.periodsService.selectedPeriod.pipe(
      takeUntilDestroyed(),
    ).subscribe(({start, end}) => this.loadGraphicData(start, end));
  }

  loadGraphicData(beginDate: string, endDate: string) {
    this.graphHttpService.getExpenseData(beginDate, endDate)
      .pipe(
        map(value => value.data)
      )
      .subscribe(data => {
        this.chart?.destroy();
        this.chart = new Chart('expense',
          {
            type: 'bar',
            data,
            options: {
              scales: {
                x: {
                  stacked: true,
                  type: 'time',
                  time: {
                    unit: 'month',
                    round: 'month',
                    tooltipFormat: 'MMMM',
                    displayFormats: {month: 'MMMM'}
                  }
                },
                y: {
                  stacked: true
                }
              }
            }
          });
      });
  }
}
