import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOffer, IOfferCreate, IOfferItemCreate, IOrder, IOrderCreate, IOrderItemCreate, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderItem {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private ordersItemsEndpointUrl: string = this.apiUrl + '/OrdersItems'


  constructor(private httpClient: HttpClient) { 
  }

  public addOrderItems(item: IItem[], order: IOrder, quantity: number, price: number, status: string): Observable<IOrderItemCreate[]> {
    let params: any = {}

    let orderItems: IOrderItemCreate[] = []

    item.forEach(item => {
      let orderItem: IOrderItemCreate = {
        Item_id: item.id,
        order_id: order.id,
        quantity: quantity,
        price: price,
        status: status,
      };
      orderItems.push(orderItem)
    })


    if (order) { params = JSON.parse(JSON.stringify(orderItems)) }

    return this.httpClient.post<IOrderItemCreate[]>(this.ordersItemsEndpointUrl, params);
  }
}