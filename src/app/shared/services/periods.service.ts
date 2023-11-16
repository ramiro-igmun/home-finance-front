import {Injectable} from '@angular/core';
import {GraphHttpService} from "../../graph/services/graph-http.service";
import {BehaviorSubject, filter, map, Observable, of, shareReplay} from "rxjs";

export interface TimePeriod {
  name: string;
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  private periodList: TimePeriod[] = [];
  private readonly periodList$: Observable<TimePeriod[]> = of([]);
  private selectedPeriod$ = new BehaviorSubject<TimePeriod>({name: "", start: "", end: ""})

  constructor(private graphHttpService: GraphHttpService) {
    this.periodList$ = this.graphHttpService.getPeriods().pipe(
      map(value => value.timePeriodList),
      shareReplay(1)
    );
    this.periodList$.subscribe(value => this.periodList = value);
    this.selectedPeriod$.next({name: '', start: '', end: ''})
  }

  public get periods() {
    return this.periodList$.pipe(
      filter(list => !!list.length)
    );
  }

  public get selectedPeriod() {
    return this.selectedPeriod$.asObservable().pipe(
      filter(period => !!period.name)
    );
  }

  public changeSelectedPeriod(period: TimePeriod) {
    this.selectedPeriod$.next(period);
  }

  public fromName(name: string) {
    const year = this.selectedPeriod$.getValue().name.split(' ')[0] || "";
    const period = this.periodList.filter(period =>
      period.name === `${year} ${name}`
    )[0];
    return {beginDate: new Date(period.start), endDate: new Date(period.end)}
  }

  public isMonth(timePeriod: TimePeriod): boolean {
    return timePeriod.name.length > 4;
  }

}
