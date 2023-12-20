import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../../positions/model/Category";


@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  @Input() categories: Category[] = [];
  @Input() detailActive: boolean = true;
  @Output() delete = new EventEmitter<string>();
  @Output() colorChange = new EventEmitter<{tag: string, color: string}>
  columns = ['tag', 'color', 'actions'];

  onDeleteCategory(tag: string) {
    this.delete.emit(tag);
  }

  onColorChange($event: Event, tag: string) {
    this.colorChange.emit({tag, color: ($event.target as any).value})
  }
}
