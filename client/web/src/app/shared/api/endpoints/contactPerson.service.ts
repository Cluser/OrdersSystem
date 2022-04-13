import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IContactPerson, IPContactPerson } from "../../models";
import { environment } from "src/environments/environment";
// import {  } from '../../models/contactPerson';

@Injectable({
  providedIn: "root",
})
export class ContactPerson {
  private apiUrl: string = environment.apiUrl;
  private contactPersonsEndpointUrl: string = this.apiUrl + "/ContactPerson";

  constructor(private httpClient: HttpClient) {}

  ////////////////////////////////////////////////////////////
  // Contact persons
  ////////////////////////////////////////////////////////////
  public getContactPersons(contactPerson?: IContactPerson, page?: number, size?: number): Observable<IPContactPerson> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(contactPerson)), { page: page, size: size });

    return this.httpClient.get<IPContactPerson>(this.contactPersonsEndpointUrl, { params: params });
  }

  public addContactPersons(contactPerson?: Partial<IContactPerson>): Observable<IContactPerson[]> {
    let params: any = {};

    if (contactPerson) {
      params = JSON.parse(JSON.stringify(contactPerson));
    }

    return this.httpClient.post<IContactPerson[]>(this.contactPersonsEndpointUrl, params);
  }

  public editContactPerson(contactPerson: Partial<IContactPerson>): Observable<IContactPerson> {
    let params: any = {};

    if (contactPerson) {
      params = JSON.parse(JSON.stringify(contactPerson));
    }

    return this.httpClient.put<IContactPerson>(this.contactPersonsEndpointUrl, params);
  }
}
