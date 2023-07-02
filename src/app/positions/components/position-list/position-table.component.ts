import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {Position} from "../../model/Position";

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent{
  @Input() positions$: Observable<Position[]> = of([]);
  @Output() selectCategory = new EventEmitter<number>();
  columns = ['date', 'amount', 'description', 'action', 'category', 'type'];
}
