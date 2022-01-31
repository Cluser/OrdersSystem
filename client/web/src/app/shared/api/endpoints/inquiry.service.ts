import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInquiry, IInquiryCreate, IInquiryEdit, IPInquiry } from '../../models';
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

  public editInquiry(inquiry: IInquiry): Observable<IInquiryEdit> {
    let params: any = {}

    let inquiryToEdit: IInquiryEdit = {
      id: inquiry.id!,
      idUser: inquiry.user!.id,
      idDistributor: inquiry.distributor!.id,
      idContactPerson: inquiry.contactPerson!.id,
      dateAndTime: inquiry.dateAndTime,
      archived: inquiry.archived
    };

    if (inquiryToEdit) { params = JSON.parse(JSON.stringify(inquiryToEdit)) }

    return this.httpClient.put<IInquiryEdit>(this.inquiriesEndpointUrl, params);
  }

}