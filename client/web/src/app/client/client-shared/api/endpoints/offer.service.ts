import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer, IOfferCreate, IPOrder } from '../../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Offer {

  private apiUrl: string = environment.apiUrl;
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