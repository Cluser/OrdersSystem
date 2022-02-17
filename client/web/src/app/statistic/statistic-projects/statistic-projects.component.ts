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
  public chartData2: any;
  public chartData3: any;
  public chartData4: any;


  public locale: string = 'pl';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCostByProjects();
    this.getCostByProjectCategory(2);
    this.getCostByUsers();
    this.getCostByUsersReq();
  }


  private getCostByProjects(): any {
    this.api.statistic.getCostByProject().subscribe((statistic) => this.chartData = statistic);
  }

  private getCostByProjectCategory(idProject: number): any {
    this.api.statistic.getCostByProjectCategory(idProject).subscribe((statistic) => this.chartData2 = statistic);
  }

  private getCostByUsers(): any {
    this.api.statistic.getCostByUser().subscribe((statistic) => this.chartData3 = statistic);
  }

  private getCostByUsersReq(): any {
    this.api.statistic.getCostByUserReq().subscribe((statistic) => this.chartData4 = statistic);
  }

  public onSelect(event: any) {
    this.api.project.getProjects({name: event.name}, 1, 1000).subscribe((project) => this.getCostByProjectCategory(project.items[0].id!));
  }
}
