import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem, IOffer, IOfferItemCreate } from '../../models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OfferItem {

  private apiUrl: string = environment.apiUrl;
  private offersItemsEndpointUrl: string = this.apiUrl + '/OffersItems'


  constructor(private httpClient: HttpClient) { 
  }

  public addOfferItems(item: IOfferItemCreate[]): Observable<IOfferItemCreate[]> {
    let params: any = {}

    let offerItems: IOfferItemCreate[] = []

    item.forEach(item => {
      let offerItem: IOfferItemCreate = {
        Item_id: item.Item_id,
        offer_id: item.offer_id,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
      };
      offerItems.push(offerItem)
    })


    if (item) { params = JSON.parse(JSON.stringify(offerItems)) }

    return this.httpClient.post<IOfferItemCreate[]>(this.offersItemsEndpointUrl, params);
  }

}