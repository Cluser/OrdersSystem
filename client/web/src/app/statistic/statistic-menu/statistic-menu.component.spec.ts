import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticMenuComponent } from './statistic-menu.component';

describe('StatisticMenuComponent', () => {
  let component: StatisticMenuComponent;
  let fixture: ComponentFixture<StatisticMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
