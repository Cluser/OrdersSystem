import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { StatisticDistributorsComponent } from './statistic-distributors.component';

describe('StatisticDistributorsComponent', () => {
  let component: StatisticDistributorsComponent;
  let fixture: ComponentFixture<StatisticDistributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, AngularMyDatePickerModule ],
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
