import {Component} from '@angular/core';
import {PositionHttpService} from "../../../positions/services/position-http.service";
import {Balance} from "../../../shared/model/Balance";
import {TimePeriod, PeriodsService} from "../../../shared/services/periods.service";
import {Observable, shareReplay, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {

  balance$: Observable<Balance>;
  period$: Observable<TimePeriod>;

  constructor(private positionHttpService: PositionHttpService,
              private periodsService:PeriodsService) {
    this.period$ = this.periodsService.selectedPeriod.pipe(
      takeUntilDestroyed()
    );
    this.balance$ = this.period$.pipe(
      switchMap(({start, end}) => this.positionHttpService.getBalance(start, end)),
      shareReplay(1)
    );
  }

}
