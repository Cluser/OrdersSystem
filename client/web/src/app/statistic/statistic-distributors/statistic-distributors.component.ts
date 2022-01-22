import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { IOrder } from 'src/app/shared/models';
import * as moment from 'moment';

@Component({
  selector: 'app-statistic-distributors',
  templateUrl: './statistic-distributors.component.html',
  styleUrls: ['./statistic-distributors.component.scss']
})
export class StatisticDistributorsComponent implements OnInit {


  public chartData: any[] = [ ];
  public chartDataCategory: any[] = [ ];
  public chartDataMonths: any[] = [ ];

  public orders: IOrder[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getCostByCategory();
    this.getCostByMonth();
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

  private getCostByCategory(): any {
    this.api.category.getCategories({}, 1, 1000).subscribe((categories) => {
      categories.items.forEach((category) => {
        let price = 0;
        this.api.order.getOrders({}, '', '', 1, 1000).subscribe((orders) => {
          orders.items.forEach((order) => {
            order.items?.forEach((orderItem: any) => {
                if (orderItem.item.idCategory === category.id) {
                  price = price + orderItem.price
                }
            })
          })
          this.chartDataCategory.push({ name: category.name!, value: price })
          this.chartDataCategory = [...this.chartDataCategory]
        })
      })
    })
  }

  private getCostByMonth(): any {
    let months = this.getMonthsBetweenDates('2021-03-20', '2023-06-11')

    months.forEach((month) => {
      let price = 0;
      this.api.order.getOrders({}, '', '', 1, 1000).subscribe((orders) => {
        orders.items.forEach((order) => {
          if (order.dateAndTime?.startsWith(month)) {
            order.items?.forEach((item) => {
              price = price + item.price!
            })
          }
        })
        this.chartDataMonths.push({ name: month, value: price })
        this.chartDataMonths = [...this.chartDataMonths]
      })

    })

  }


  private getMonthsBetweenDates(start: string, end: string): string[] {
    let dateStart = moment(start, "YYYY-MM-DD");
    let dateEnd = moment(end, "YYYY-MM-DD");

    let timeValues = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      timeValues.push(dateStart.format('YYYY-MM'));
      dateStart.add(1,'month');
    }
    console.log(timeValues);
    return timeValues;
  }
  
}
