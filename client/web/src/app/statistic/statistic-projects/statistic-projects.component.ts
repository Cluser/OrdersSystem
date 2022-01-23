import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'app-statistic-projects',
  templateUrl: './statistic-projects.component.html',
  styleUrls: ['./statistic-projects.component.scss']
})
export class StatisticProjectsComponent implements OnInit {

  public model: any = null;

  public chartData: any;
  public chartData2: any


  public locale: string = 'pl';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCostByProjects();
    this.getCostByProjectCategory();
  }


  private getCostByProjects(): any {
    this.api.statistic.getCostByProject().subscribe((statistic) => this.chartData = statistic);
  }

  private getCostByProjectCategory(): any {
    this.api.statistic.getCostByProjectCategory().subscribe((statistic) => this.chartData2 = statistic);
  }
}
