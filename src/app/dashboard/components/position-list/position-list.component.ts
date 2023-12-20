import {Component, Input} from '@angular/core';
import {BehaviorSubject, map, Observable, of, switchMap} from "rxjs";
import {Position, PositionType} from "../../../positions/model/Position";
import {PositionService} from "../../../positions/services/position.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PeriodsService} from "../../../shared/services/periods.service";

export interface PositionFilter {
  type?: PositionType;
  date?: string;
}

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss']
})
export class PositionListComponent {

  positions$: Observable<Position[]> = of([]);
  total$: Observable<number> = of(0);
  displayedColumns = ['date', 'description', 'amount']
  private filter$ = new BehaviorSubject<PositionFilter>({});

  @Input() set filter(filter: PositionFilter) {
    this.filter$.next(filter);
  }

  constructor(private positionService: PositionService, private periodService: PeriodsService) {
    this.positions$ = this.filter$.pipe(
      switchMap(({type, date}) => this.positionService.positions.pipe(
        map(positions => positions.filter(position =>
          (!type || type === position.type) &&
          this.isWithinPeriod(date, position)
        ))
      )),
      takeUntilDestroyed()
    );
    this.total$ = this.positions$.pipe(
      map(positions => positions
        .map(position => position.amount)
        .reduce((acc, val) => acc + val, 0))
    );
  }

  private isWithinPeriod(date: string | undefined, position: Position) {
    const period = this.periodService.fromName(date || 'JUNE');
    return position.date <= period.endDate && position.date >= period.beginDate;
  }
}
