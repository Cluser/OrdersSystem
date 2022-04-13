import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StatisticDistributorsComponent } from "./statistic-distributors/statistic-distributors.component";
import { StatisticProjectsComponent } from "./statistic-projects/statistic-projects.component";
import { StatisticComponent } from "./statistic.component";

const routes: Routes = [
  {
    path: "",
    component: StatisticComponent,
    children: [
      { path: "distributors", component: StatisticDistributorsComponent },
      { path: "projects", component: StatisticProjectsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticRoutingModule {}
