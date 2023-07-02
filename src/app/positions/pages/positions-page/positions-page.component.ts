import {Component, OnInit} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {Position, PositionType} from "../../model/Position";
import {PositionHttpService} from "../../services/position-http.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "../../components/category-dialog/category-dialog.component";

@Component({
  selector: 'app-positions-page',
  templateUrl: './positions-page.component.html',
  styleUrls: ['./positions-page.component.scss']
})
export class PositionsPageComponent implements OnInit {
  positions$: Observable<Position[]> = of([]);
  expenses$: Observable<number> = of(0);
  income$: Observable<number> = of(0);

  constructor(private positionHttpService: PositionHttpService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.positions$ = this.positionHttpService.getPositions();
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

  onSelectCategory(positionId: number) {
    const dialogRef = this.dialog.open(CategoryDialogComponent,
      {data: {positionId}});
    dialogRef.afterClosed().subscribe((category: string) => {
      if (category?.length) {
        console.log(category);
      }
    });
  }
}
