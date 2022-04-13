import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/api/api.service";
import { IOrder } from "src/app/shared/models";
import * as moment from "moment";
import { IAngularMyDpOptions, IMyRangeDateSelection, IMyDateModel } from "angular-mydatepicker";

@Component({
  selector: "app-statistic-distributors",
  templateUrl: "./statistic-distributors.component.html",
  styleUrls: ["./statistic-distributors.component.scss"],
})
export class StatisticDistributorsComponent implements OnInit {
  public chartData: any;
  public chartDataCategory: any;
  public chartDataClient: any;
  public chartDataMonths: any[] = [];
  public chartDataItems: any[] = [];
  public model: any = null;

  public myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    showWeekNumbers: true,
    dateFormat: "yyyy.mm.dd",
    // other options are here...
  };

  public locale: string = "pl";

  public orders: IOrder[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getOrders();
    this.getCostByCategory();
    this.getCostByClient();
  }

  private getOrders(): any {
    this.api.statistic.getCostByDistributor().subscribe((statistic) => (this.chartData = statistic));
  }

  private getCostByCategory(): any {
    this.api.statistic.getCostByCategory().subscribe((statistic) => (this.chartDataCategory = statistic));
  }

  private getCostByClient(): any {
    this.api.statistic.getCostByClient().subscribe((statistic) => (this.chartDataClient = statistic));
  }

  private getCostByMonth(start: string, end: string): any {
    let months = this.getMonthsBetweenDates(start, end);

    months.forEach((month) => {
      let price = 0;
      this.api.order.getOrders({}, start, end, 1, 1000).subscribe((orders) => {
        orders.items?.forEach((order) => {
          if (order.dateAndTime?.startsWith(month)) {
            order.items?.forEach((item) => {
              price = price + item.price!;
            });
          }
        });
        this.chartDataMonths.push({ name: month, value: price });
        this.chartDataMonths = [...this.chartDataMonths];
      });
    });
  }

  private getMonthsBetweenDates(start: string, end: string): string[] {
    let dateStart = moment(start, "YYYY-MM-DD");
    let dateEnd = moment(end, "YYYY-MM-DD");

    let timeValues = [];

    while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
      timeValues.push(dateStart.format("YYYY-MM"));
      dateStart.add(1, "month");
    }
    console.log(timeValues);
    return timeValues;
  }

  public onDateChanged(event: IMyDateModel): void {
    let dateStart = event.dateRange?.formatted?.slice(0, 10).replace(".", "-").replace(".", "-");
    let dateEnd = event.dateRange?.formatted?.slice(13, 23).replace(".", "-").replace(".", "-");

    this.getCostByMonth(dateStart!, dateEnd!);
    this.getItemsPerMonth(dateStart!, dateEnd!);
  }

  private getItemsPerMonth(start: string, end: string): void {
    let months = this.getMonthsBetweenDates(start, end);
    this.chartDataItems = [];
    this.api.item.getItems({}, start, end, 1, 1000).subscribe((item) => {
      months.forEach((month) => {
        let count = 0;
        item.items?.forEach((item) => {
          if (item.dateAndTime?.slice(0, 7) === month.slice(0, 7)) {
            count = count + 1;
          }
        });
        this.chartDataItems.push({ name: month, value: count });
        this.chartDataItems = [...this.chartDataItems];
      });
    });
  }
}
