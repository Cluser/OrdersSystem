import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInquiryItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InquiryItem {
  private apiUrl: string = environment.apiUrl;
  private inquiriesItemsEndpointUrl: string = this.apiUrl + '/InquiriesItems';

  constructor(private httpClient: HttpClient) {}

  public addInquiryItems(item: IInquiryItem[]): Observable<IInquiryItem[]> {
    let params: any = {};

    if (item) {
      params = JSON.parse(JSON.stringify(item));
    }

    return this.httpClient.post<IInquiryItem[]>(
      this.inquiriesItemsEndpointUrl,
      params
    );
  }

  public editdInquiryItem(
    order: Partial<IInquiryItem[]>
  ): Observable<IInquiryItem[]> {
    let params: any = {};

    if (order) {
      params = JSON.parse(JSON.stringify(order));
    }

    return this.httpClient.put<IInquiryItem[]>(
      this.inquiriesItemsEndpointUrl,
      params
    );
  }
}
