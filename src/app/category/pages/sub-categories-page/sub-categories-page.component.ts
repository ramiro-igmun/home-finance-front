import {Component, OnInit} from '@angular/core';
import {filter, map, Observable, of, shareReplay} from "rxjs";
import {CategoryHttpService} from "../../service/category-http.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryModalComponent} from "../../components/add-category-modal/add-category-modal.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sub-categories-page',
  templateUrl: './sub-categories-page.component.html',
  styleUrls: ['./sub-categories-page.component.scss']
})
export class SubCategoriesPageComponent implements OnInit{

  categories$: Observable<string[]> = of([]);
  group: string = "";

  constructor(private categoryHttpService: CategoryHttpService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.group = this.activatedRoute.snapshot.paramMap.get('tag') || "";
    this.populateTable(this.group);
  }

  populateTable(tag: string): void {
    this.categories$ = this.categoryHttpService.getByGroupTag(tag).pipe(
      map(category => category.map(element => element.tag)),
      shareReplay(1)
    );
  }

  onDeleteCategory(category: string) {
    this.categoryHttpService.deleteCategory(category).subscribe(_ => this.populateTable(this.group));
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(AddCategoryModalComponent);
    dialogRef.afterClosed().pipe(filter(result => !!result))
      .subscribe(result => {
        this.categoryHttpService.addSubCategory(this.group, result).subscribe(_ =>
          this.populateTable(this.group))
      });
  }

}
