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
import { CategoryDialogComponent } from './positions/components/category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PositionTableComponent,
    PositionsPageComponent,
    MainLayoutComponent,
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
