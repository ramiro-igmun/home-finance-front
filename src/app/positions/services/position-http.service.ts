import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Position, PositionInt} from "../model/Position";

@Injectable({
  providedIn: 'root'
})
export class PositionHttpService {
  private readonly url = 'http://localhost:8080/api/v0/positions'

  constructor(private httpClient:HttpClient) { }
  public getPositions(): Observable<Position[]> {
    return this.httpClient.get<{positions: PositionInt[]}>(this.url).pipe(
      map(response => response.positions),
      map(positions => positions.map(position => new Position(position)))
    );
  }
}
