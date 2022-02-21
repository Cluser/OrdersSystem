import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticProjectsComponent } from './statistic-projects.component';

describe('StatisticProjectsComponent', () => {
  let component: StatisticProjectsComponent;
  let fixture: ComponentFixture<StatisticProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
