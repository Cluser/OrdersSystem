import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInquiry, IInquiryItemCreate, IItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryItem {

  private apiUrl: string = environment.apiUrl;
  private inquiriesItemsEndpointUrl: string = this.apiUrl + '/InquiriesItems'


  constructor(private httpClient: HttpClient) { 
  }


  public addInquiryItems(item: IInquiryItemCreate[]): Observable<IInquiryItemCreate[]> {
    let params: any = {}

    let inquiryItems: IInquiryItemCreate[] = []

    item.forEach(item => {
      let inquiryItem: IInquiryItemCreate = {
        Item_id: item.Item_id,
        inquiry_id: item.inquiry_id,
        quantity: item.quantity,
        status: item.status,
      };
      inquiryItems.push(inquiryItem)
    })


    if (item) { params = JSON.parse(JSON.stringify(inquiryItems)) }

    return this.httpClient.post<IInquiryItemCreate[]>(this.inquiriesItemsEndpointUrl, params);
  }

}