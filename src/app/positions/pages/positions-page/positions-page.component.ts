import {Component, OnInit} from '@angular/core';
import {filter, map, Observable, of, shareReplay, startWith} from "rxjs";
import {Position, PositionType} from "../../model/Position";
import {PositionHttpService} from "../../services/position-http.service";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {CategoryHttpService} from "../../../category/service/category-http.service";
import {PositionService} from "../../services/position.service";

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss']
})
export class PositionsPageComponent implements OnInit {
  positions$: Observable<Position[]> = of([]);
  categories$: Observable<string[]> = of([]);
  expenses$: Observable<number> = of(1);
  income$: Observable<number> = of(1);

  constructor(private positionService: PositionService,
              private positionHttpService: PositionHttpService,
              private categoryHttpService: CategoryHttpService) {
  }

  ngOnInit(): void {
    this.populatePositions();
    this.categories$ = this.categoryHttpService.getCategories().pipe(
      map(category => category.map(element => element.tag)),
      shareReplay(1)
    );
  }

  populatePositions() {
    this.positions$ = this.positionService.positions
    this.expenses$ = this.positions$.pipe(
      map(positions => positions
        .filter(position => position.type == PositionType.EXPENSE)
        .map(position => position.amount)
        .reduce((val, acc) => val + acc)
      )
    );
    this.income$ = this.positions$.pipe(
      map(positions => positions
        .filter(position => position.type == PositionType.INCOME)
        .map(position => position.amount)
        .reduce((val, acc) => val + acc)
      )
    );
  }

  onSelectCategory({category, description}: {category:string , description: string}) {
    this.positionHttpService.assignCategory({tag: category, description}).subscribe(_ => {
      this.populatePositions();
    })
  }

}
