import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { StatisticMenuComponent } from './statistic-menu/statistic-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticDistributorsComponent } from './statistic-distributors/statistic-distributors.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { StatisticProjectsComponent } from './statistic-projects/statistic-projects.component';



@NgModule({
  declarations: [
    StatisticComponent,
    StatisticMenuComponent,
    StatisticDistributorsComponent,
    StatisticProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule, 
    AngularMyDatePickerModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
