import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-projects',
  templateUrl: './statistic-projects.component.html',
  styleUrls: ['./statistic-projects.component.scss']
})
export class StatisticProjectsComponent implements OnInit {

  public model: any = null;

  public locale: string = 'pl';

  constructor() { }

  ngOnInit(): void {
  }

}
