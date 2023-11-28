import { Injectable } from '@angular/core';
import {PositionHttpService} from "./position-http.service";
import {filter, Observable, of, shareReplay, switchMap} from "rxjs";
import {Position} from "../model/Position";
import {PeriodsService} from "../../shared/services/periods.service";


@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positions$: Observable<Position[]> = of([]);

  constructor(private positionHttpService: PositionHttpService,
              private periodsService: PeriodsService) {
    this.loadPositions();
  }

  loadPositions() {
    this.positions$ = this.periodsService.selectedPeriod.pipe(
      switchMap(({start, end}) => this.positionHttpService.getPositions({beginDate: start, endDate: end})),
      filter(positions => !!positions.length),
      shareReplay(1));
  }

  get positions() {
    return this.positions$;
  }

}
