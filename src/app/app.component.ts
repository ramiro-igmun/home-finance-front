import {Component, OnInit} from '@angular/core';
import {PeriodsService} from "./shared/services/periods.service";
import {take} from "rxjs";
import {PositionService} from "./positions/services/position.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'home-finance-front';
}
