import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem, IOrder, IOrderItemCreate } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItem {

  private apiUrl: string = environment.apiUrl;
  private ordersItemsEndpointUrl: string = this.apiUrl + '/OrdersItems'


  constructor(private httpClient: HttpClient) { 
  }

  public addOrderItems(item: IOrderItemCreate[]): Observable<IOrderItemCreate[]> {
    let params: any = {}

    let orderItems: IOrderItemCreate[] = []

    item.forEach(item => {
      let orderItem: IOrderItemCreate = {
        Item_id: item.Item_id,
        order_id: item.order_id,
        quantity: item.quantity,
        price: item.price,
        status: item.status
      };
      orderItems.push(orderItem)
    })


    if (item) { params = JSON.parse(JSON.stringify(orderItems)) }

    return this.httpClient.post<IOrderItemCreate[]>(this.ordersItemsEndpointUrl, params);
  }
}