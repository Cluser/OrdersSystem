import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOfferItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferItem {
  private apiUrl: string = environment.apiUrl;
  private offersItemsEndpointUrl: string = this.apiUrl + '/OffersItems';

  constructor(private httpClient: HttpClient) {}

  public addOfferItems(item: Partial<IOfferItem[]>): Observable<IOfferItem[]> {
    let params: any = {};

    if (item) {
      params = JSON.parse(JSON.stringify(item));
    }

    return this.httpClient.post<IOfferItem[]>(
      this.offersItemsEndpointUrl,
      params
    );
  }

  public editdOfferItem(
    order: Partial<IOfferItem[]>
  ): Observable<IOfferItem[]> {
    let params: any = {};

    if (order) {
      params = JSON.parse(JSON.stringify(order));
    }

    return this.httpClient.put<IOfferItem[]>(
      this.offersItemsEndpointUrl,
      params
    );
  }
}
