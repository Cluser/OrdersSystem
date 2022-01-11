import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem, IOffer, IOfferItemCreate } from '../../models/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OfferItem {

  private apiUrl: string = environment.apiUrl;
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