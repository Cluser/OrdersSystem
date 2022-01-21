import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { IOrder } from 'src/app/shared/models';

@Component({
  selector: 'app-statistic-distributors',
  templateUrl: './statistic-distributors.component.html',
  styleUrls: ['./statistic-distributors.component.scss']
})
export class StatisticDistributorsComponent implements OnInit {


  public chartData: any[] = [ ];
  public orders: IOrder[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): any {
    this.api.distributor.getDistributors({}, 1, 1000).subscribe((distributors) => {
      distributors.items.forEach((distributor) => {
        let price = 0;
        this.api.order.getOrders({idDistributor: distributor.id}, '', '', 1, 1000).subscribe((orders) => {
          orders.items.forEach((order) => {
            order.items!.forEach((item) => {
              price = price + item.price!
            });
          });
          this.chartData.push({ name: distributor.name!, value: price })
          this.chartData = [...this.chartData]
        });
      });
    })
  }
  
}
