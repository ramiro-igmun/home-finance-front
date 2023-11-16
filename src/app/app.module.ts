import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {PositionTableComponent} from "./positions/components/position-list/position-table.component";
import {MatTableModule} from "@angular/material/table";
import {PositionsPageComponent} from './positions/pages/positions-page/positions-page.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SelectAutocompleteComponent } from './shared/components/select-autocomplete/select-autocomplete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import { CategoriesPageComponent } from './category/pages/categories-page/categories-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { CategoriesTableComponent } from './category/components/categories-list/categories-table.component';
import { AddCategoryModalComponent } from './category/components/add-category-modal/add-category-modal.component';
import { IncomeExpenseGraphComponent } from './graph/component/income-expense-graph/income-expense-graph.component';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import {MatCardModule} from "@angular/material/card";
import { BalanceComponent } from './dashboard/components/balance/balance.component';
import { PositionListComponent } from './dashboard/components/position-list/position-list.component';
import { SelectPeriodComponent } from './shared/components/select-period/select-period.component';
import {MatSelectModule} from "@angular/material/select";
import {CdkTableModule} from "@angular/cdk/table";
import { CategoryExpenseGraphComponent } from './graph/component/category-expense-graph/category-expense-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    PositionTableComponent,
    PositionsPageComponent,
    MainLayoutComponent,
    SelectAutocompleteComponent,
    CategoriesPageComponent,
    CategoriesTableComponent,
    AddCategoryModalComponent,
    IncomeExpenseGraphComponent,
    DashboardPageComponent,
    BalanceComponent,
    PositionListComponent,
    SelectPeriodComponent,
    CategoryExpenseGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
