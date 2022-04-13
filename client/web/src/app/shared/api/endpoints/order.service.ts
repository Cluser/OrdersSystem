import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrder, IPOrder } from "../../models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class Order {
  private apiUrl: string = environment.apiUrl;
  private ordersEndpointUrl: string = this.apiUrl + "/Orders";

  constructor(private httpClient: HttpClient) {}

  public getOrders(order?: IOrder, dateAndTimeStart?: string, dateAndTimeEnd?: string, page?: number, size?: number): Observable<IPOrder> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(order)), { dateAndTimeStart: dateAndTimeStart, dateAndTimeEnd: dateAndTimeEnd, page: page, size: size });

    return this.httpClient.get<IPOrder>(this.ordersEndpointUrl, { params: params });
  }

  public addOrder(order: Partial<IOrder>): Observable<IOrder[]> {
    let params: any = {};

    if (order) {
      params = JSON.parse(JSON.stringify(order));
    }

    return this.httpClient.post<IOrder[]>(this.ordersEndpointUrl, params);
  }

  public editOrder(order: Partial<IOrder>): Observable<IOrder> {
    let params: any = {};

    if (order) {
      params = JSON.parse(JSON.stringify(order));
    }

    return this.httpClient.put<IOrder>(this.ordersEndpointUrl, params);
  }
}
