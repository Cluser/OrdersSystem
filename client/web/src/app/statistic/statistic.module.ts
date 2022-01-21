import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { StatisticMenuComponent } from './statistic-menu/statistic-menu.component';
import { FormsModule } from '@angular/forms';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticDistributorsComponent } from './statistic-distributors/statistic-distributors.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    StatisticComponent,
    StatisticMenuComponent,
    StatisticDistributorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
