import {Component, OnInit} from '@angular/core';
import {CategoryHttpService} from "../../service/category-http.service";
import {filter, map, Observable, of, shareReplay} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryModalComponent} from "../../components/add-category-modal/add-category-modal.component";
import {Category} from "../../../positions/model/Category";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]> = of([]);

  constructor(private categoryHttpService: CategoryHttpService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable(): void {
    this.categories$ = this.categoryHttpService.getCategories().pipe(
      shareReplay(1)
    );
  }

  onDeleteCategory(category: string) {
    this.categoryHttpService.deleteCategory(category).subscribe(_ => this.populateTable());
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(AddCategoryModalComponent);
    dialogRef.afterClosed().pipe(filter(result => !!result))
      .subscribe(result => {
        this.categoryHttpService.createCategory(result).subscribe(_ =>
          this.populateTable())
      });
  }

  onColorChange({tag, color}: {tag: string; color: string}) {
    this.categoryHttpService.changeCategoryColor(tag, color).subscribe(_ => this.populateTable());
  }
}
