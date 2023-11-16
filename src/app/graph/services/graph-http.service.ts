import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrimitiveData} from "../model/PrimitiveData";
import {TimePeriod} from "../../shared/services/periods.service";
import {ObjectData} from "../model/ObjectData";

@Injectable({
  providedIn: 'root'
})
export class GraphHttpService {
  private readonly url = 'http://localhost:8080/api/v0/graphs'
  constructor(private httpClient:HttpClient) { }

  public getPeriods(): Observable<{timePeriodList: TimePeriod[]}> {
    return this.httpClient.get<{timePeriodList: TimePeriod[]}>(`${this.url}/periods`);
  }

  public getIncomeExpenseData(beginDate: string, endDate: string): Observable<{data: ObjectData}> {
    return this.httpClient.get<{data: ObjectData}>(`${this.url}/income-expense`, {params: {beginDate, endDate}}).pipe(
    );
  }

  public getExpenseData(beginDate: string, endDate: string): Observable<{data: ObjectData}> {
    return this.httpClient.get<{data: ObjectData}>(`${this.url}/category-expense`, {params: {beginDate, endDate}}).pipe(
    );
  }
}
