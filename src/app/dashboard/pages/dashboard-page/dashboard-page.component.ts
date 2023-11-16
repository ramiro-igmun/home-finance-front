import { Component } from '@angular/core';
import {PositionType} from "../../../positions/model/Position";
import {PeriodsService, TimePeriod} from "../../../shared/services/periods.service";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  isMonthPeriod$;

  constructor(private periodsService: PeriodsService) {
   this.isMonthPeriod$ = periodsService.selectedPeriod.pipe(
     map(period => this.periodsService.isMonth(period))
   );
  }

  dataFilter: { type?: PositionType; date?: string } = {};

  onDataFilter($event: { type?: PositionType; date?: string }) {
    this.dataFilter = $event;
  }
}
