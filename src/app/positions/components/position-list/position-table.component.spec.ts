import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTableComponent } from './position-table.component';

describe('PositionListComponent', () => {
  let component: PositionTableComponent;
  let fixture: ComponentFixture<PositionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionTableComponent]
    });
    fixture = TestBed.createComponent(PositionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});