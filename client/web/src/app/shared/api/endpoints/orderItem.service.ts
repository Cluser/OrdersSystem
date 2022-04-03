import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderItem {
  private apiUrl: string = environment.apiUrl;
  private ordersItemsEndpointUrl: string = this.apiUrl + '/OrdersItems';

  constructor(private httpClient: HttpClient) {}

  public addOrderItems(item: Partial<IOrderItem[]>): Observable<IOrderItem[]> {
    let params: any = {};

    if (item) {
      params = JSON.parse(JSON.stringify(item));
    }

    return this.httpClient.post<IOrderItem[]>(
      this.ordersItemsEndpointUrl,
      params
    );
  }

  public editdOrderItem(
    order: Partial<IOrderItem[]>
  ): Observable<IOrderItem[]> {
    let params: any = {};

    if (order) {
      params = JSON.parse(JSON.stringify(order));
    }

    return this.httpClient.put<IOrderItem[]>(
      this.ordersItemsEndpointUrl,
      params
    );
  }
}
