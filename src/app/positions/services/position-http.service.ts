import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Position, PositionInt} from "../model/Position";
import {Balance} from "../../shared/model/Balance";

@Injectable({
  providedIn: 'root'
})
export class PositionHttpService {
  private readonly url = 'http://localhost:8080/api/v0/positions'
  constructor(private httpClient:HttpClient) { }
  public getPositions(params: {beginDate: string, endDate: string}): Observable<Position[]> {
    return this.httpClient.get<{positions: PositionInt[]}>(this.url, {params}).pipe(
      map(response => response.positions),
      map(positions => positions.map(position => new Position(position)))
    );
  }

  public getBalance(beginDate: string, endDate: string): Observable<Balance> {
    return this.httpClient.get<Balance>(`${this.url}/balance`, {params: {beginDate, endDate}});
  }

  public assignCategory(body: {tag: string, description: string}): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/category`, body);
  }
}
