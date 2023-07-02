import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PositionTableComponent} from "./positions/components/position-list/position-table.component";
import {PositionsPageComponent} from "./positions/pages/positions-page/positions-page.component";

const routes: Routes = [
  {path: 'positions', component: PositionsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
