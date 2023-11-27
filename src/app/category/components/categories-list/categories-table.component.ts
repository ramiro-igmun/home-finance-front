import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  @Input() categories: string[] = [];
  @Input() detailActive: boolean = true;
  @Output() delete = new EventEmitter<string>();
  columns = ['tag', 'actions'];

  onDeleteCategory(tag: string) {
    this.delete.emit(tag);
  }
}
