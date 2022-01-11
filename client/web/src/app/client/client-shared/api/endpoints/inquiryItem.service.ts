import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInquiry, IInquiryItemCreate, IItem } from '../../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryItem {

  private apiUrl: string = environment.apiUrl;
  private inquiriesItemsEndpointUrl: string = this.apiUrl + '/InquiriesItems'


  constructor(private httpClient: HttpClient) { 
  }


  public addInquiryItems(item: IItem[], inquiry: IInquiry, quantity: number, status: string): Observable<IInquiryItemCreate[]> {
    let params: any = {}

    let inquiryItems: IInquiryItemCreate[] = []

    item.forEach(item => {
      let inquiryItem: IInquiryItemCreate = {
        Item_id: item.id,
        inquiry_id: inquiry.id,
        quantity: quantity,
        status: status,
      };
      inquiryItems.push(inquiryItem)
    })


    if (inquiry) { params = JSON.parse(JSON.stringify(inquiryItems)) }

    return this.httpClient.post<IInquiryItemCreate[]>(this.inquiriesItemsEndpointUrl, params);
  }

}