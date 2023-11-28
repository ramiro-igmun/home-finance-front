import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from "../../model/Position";

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent{
  @Input() positions: Position[] = [];
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<{category: string, description: string}>();
  columns = ['date', 'amount', 'description', 'group', 'category', 'type'];

  onCategorySelected(category: string, description: string) {
    this.categorySelected.emit({category, description});
  }
}
