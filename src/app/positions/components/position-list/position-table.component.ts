import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {Position} from "../../model/Position";
import {FormControl} from "@angular/forms";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent{
  @Input() positions: Position[] = [];
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<{category: string, description: string}>();
  columns = ['date', 'amount', 'description', 'category', 'type'];

  onCategorySelected(category: string, description: string) {
    this.categorySelected.emit({category, description});
  }
}
