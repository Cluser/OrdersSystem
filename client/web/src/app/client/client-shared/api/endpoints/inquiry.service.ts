import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInquiry, IInquiryCreate, IPInquiry } from '../../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Inquiry {

  private apiUrl: string = environment.apiUrl;
  private inquiriesEndpointUrl: string = this.apiUrl + '/Inquiries'


  constructor(private httpClient: HttpClient) { 
  }

  public getInquiries(inquiry?: IInquiry, page?: number, size?: number): Observable<IPInquiry> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(inquiry)), {'page': page, 'size': size})

    return this.httpClient.get<IPInquiry>(this.inquiriesEndpointUrl, {params: params});
  }

  public addInquiry(inquiry: IInquiryCreate): Observable<IInquiryCreate[]> {
    let params: any = {}

    if (inquiry) { params = JSON.parse(JSON.stringify(inquiry)) }

    return this.httpClient.post<IInquiryCreate[]>(this.inquiriesEndpointUrl, params);
  }

}