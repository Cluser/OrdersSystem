import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer, IOfferCreate, IOfferEdit, IPOffer } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Offer {

  private apiUrl: string = environment.apiUrl;
  private offersEndpointUrl: string = this.apiUrl + '/Offers'


  constructor(private httpClient: HttpClient) { 
  }

  public getOffers(offer?: IOffer, page?: number, size?: number): Observable<IPOffer> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(offer)), {'page': page, 'size': size})

    return this.httpClient.get<IPOffer>(this.offersEndpointUrl, {params: params});
  }

  public addOffer(offer: IOfferCreate): Observable<IOfferCreate[]> {
    let params: any = {}

    if (offer) { params = JSON.parse(JSON.stringify(offer)) }

    return this.httpClient.post<IOfferCreate[]>(this.offersEndpointUrl, params);
  }

  public editOffer(offer: IOfferEdit): Observable<IOfferEdit> {
    let params: any = {}

    let offerToEdit: IOfferEdit = {
      id: offer.id!,
      idUser: offer.idUser,
      idDistributor: offer.idDistributor,
      idContactPerson: offer.idContactPerson,
      dateAndTime: offer.dateAndTime,
      archived: offer.archived
    };

    if (offerToEdit) { params = JSON.parse(JSON.stringify(offerToEdit)) }

    return this.httpClient.put<IOfferEdit>(this.offersEndpointUrl, params);
  }
}