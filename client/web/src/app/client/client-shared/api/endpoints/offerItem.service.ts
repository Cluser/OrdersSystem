import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOffer, IOfferCreate, IOfferItemCreate, IOrder, IOrderCreate, IOrderItemCreate, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class OfferItem {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private offersItemsEndpointUrl: string = this.apiUrl + '/OffersItems'


  constructor(private httpClient: HttpClient) { 
  }

  public addOfferItems(item: IItem[], offer: IOffer, quantity: number, price: number, status: string): Observable<IOfferItemCreate[]> {
    let params: any = {}

    let offerItems: IOfferItemCreate[] = []

    item.forEach(item => {
      let offerItem: IOfferItemCreate = {
        Item_id: item.id,
        offer_id: offer.id,
        quantity: quantity,
        price: price,
        status: status,
      };
      offerItems.push(offerItem)
    })


    if (offer) { params = JSON.parse(JSON.stringify(offerItems)) }

    return this.httpClient.post<IOfferItemCreate[]>(this.offersItemsEndpointUrl, params);
  }

}