import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PositionTableComponent} from "./positions/components/position-list/position-table.component";
import {PositionsPageComponent} from "./positions/pages/positions-page/positions-page.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {CategoriesPageComponent} from "./category/pages/categories-page/categories-page.component";
import {DashboardPageComponent} from "./dashboard/pages/dashboard-page/dashboard-page.component";
import {SubCategoriesPageComponent} from "./category/pages/sub-categories-page/sub-categories-page.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'positions', component: PositionsPageComponent},
  {path: 'categories', component: CategoriesPageComponent},
  {path: 'categories/:tag', component: SubCategoriesPageComponent},
  {path: '', redirectTo: 'positions', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
