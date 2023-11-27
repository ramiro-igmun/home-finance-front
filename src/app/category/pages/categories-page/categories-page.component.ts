import {Component, OnInit} from '@angular/core';
import {CategoryHttpService} from "../../service/category-http.service";
import {filter, map, Observable, of, shareReplay} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryModalComponent} from "../../components/add-category-modal/add-category-modal.component";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<string[]> = of([]);

  constructor(private categoryHttpService: CategoryHttpService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable(): void {
    this.categories$ = this.categoryHttpService.getCategories().pipe(
      map(category => category.map(element => element.tag)),
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

}
