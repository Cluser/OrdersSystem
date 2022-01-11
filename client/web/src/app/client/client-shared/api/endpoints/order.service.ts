import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOffer, IOfferCreate, IOfferItemCreate, IOrder, IOrderCreate, IOrderItemCreate, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class Order {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private ordersEndpointUrl: string = this.apiUrl + '/Orders'


  constructor(private httpClient: HttpClient) { 
  }

  public getOrders(order?: IOrder, page?: number, size?: number): Observable<IPOrder> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(order)), {'page': page, 'size': size})

    return this.httpClient.get<IPOrder>(this.ordersEndpointUrl, {params: params});
  }

  public addOrder(order: IOrderCreate): Observable<IOrderCreate[]> {
    let params: any = {}

    if (order) { params = JSON.parse(JSON.stringify(order)) }

    return this.httpClient.post<IOrderCreate[]>(this.ordersEndpointUrl, params);
  }

}