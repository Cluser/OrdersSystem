import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOffer, IOfferCreate, IOfferItemCreate, IOrder, IOrderCreate, IOrderItemCreate, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class Offer {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private offersEndpointUrl: string = this.apiUrl + '/Offers'


  constructor(private httpClient: HttpClient) { 
  }

  public getOffers(offer?: IOffer, page?: number, size?: number): Observable<IPOrder> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(offer)), {'page': page, 'size': size})

    return this.httpClient.get<IPOrder>(this.offersEndpointUrl, {params: params});
  }

  public addOffer(offer: IOfferCreate): Observable<IOfferCreate[]> {
    let params: any = {}

    if (offer) { params = JSON.parse(JSON.stringify(offer)) }

    return this.httpClient.post<IOfferCreate[]>(this.offersEndpointUrl, params);
  }
}