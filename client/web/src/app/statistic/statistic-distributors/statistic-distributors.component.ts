import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { IOrder } from 'src/app/shared/models';

@Component({
  selector: 'app-statistic-distributors',
  templateUrl: './statistic-distributors.component.html',
  styleUrls: ['./statistic-distributors.component.scss']
})
export class StatisticDistributorsComponent implements OnInit {

// public saleData = [
//     { name: "", value: 105000 },
//   ];

  public chartData = []

  public orders: IOrder[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // private getOrders() {
  //   this.api.order.getOrders({}, 1, 1000).subscribe((orders) => {
  //     console.log(orders)
  //     orders.items.forEach((order: any) => {
  //       let price = 0;
  //       order.items.forEach((item: any) => {
  //         price = price + item.price;
  //         console.log(this.saleData)
  //       })
  //       this.saleData.push({name: order.distributor.name, value: price} )
  //       this.saleData = [...this.saleData]
  //     })

  //   });
  // }

  private getOrders() {
    this.api.order.getOrders({}, 1, 1000).subscribe((orders) => {
      orders.items
    });
  }
  
}
