import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDistributorsComponent } from './statistic-distributors.component';

describe('StatisticDistributorsComponent', () => {
  let component: StatisticDistributorsComponent;
  let fixture: ComponentFixture<StatisticDistributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticDistributorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
