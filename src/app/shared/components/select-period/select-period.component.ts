import {Component} from '@angular/core';
import {TimePeriod, PeriodsService} from "../../services/periods.service";
import {Observable, of, skip, tap} from "rxjs";
import {FormControl} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-select-period',
  templateUrl: './select-period.component.html',
  styleUrls: ['./select-period.component.scss']
})
export class SelectPeriodComponent {

  options$: Observable<TimePeriod[]> = of([]);
  selectControl = new FormControl();

  constructor(private periodsService: PeriodsService) {
    this.options$ = this.periodsService.periods.pipe(
      tap(periods => this.selectControl.setValue(periods.find(value => value.name === '2023')))
    );
    this.selectControl.valueChanges.pipe(
      takeUntilDestroyed(),
      skip(1),
    ).subscribe(value => this.periodsService.changeSelectedPeriod(value))
  }
}
