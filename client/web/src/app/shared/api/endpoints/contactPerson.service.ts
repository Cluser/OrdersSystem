import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactPerson, IContactPersonCreate, IContactPersonEdit, IPContactPerson } from '../../models';
import { environment } from 'src/environments/environment';
// import {  } from '../../models/contactPerson';


@Injectable({
  providedIn: 'root'
})
export class ContactPerson {

  private apiUrl: string = environment.apiUrl;
  private contactPersonsEndpointUrl: string = this.apiUrl + '/ContactPerson'

  constructor(private httpClient: HttpClient) { 
  }

  
  ////////////////////////////////////////////////////////////
  // Contact persons
  ////////////////////////////////////////////////////////////
  public getContactPersons(contactPerson?: IContactPerson, page?: number, size?: number): Observable<IPContactPerson> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(contactPerson)), {'page': page, 'size': size})

    return this.httpClient.get<IPContactPerson>(this.contactPersonsEndpointUrl, {params: params});
  }

  public addContactPersons(contactPerson?: IContactPerson): Observable<IContactPerson[]> {
    let params: any = {};

    if (contactPerson) { params = JSON.parse(JSON.stringify(contactPerson)) }

    return this.httpClient.post<IContactPersonCreate[]>(this.contactPersonsEndpointUrl, params);
  }

  public editContactPerson(contactPerson: IContactPerson): Observable<IContactPersonEdit> {
    let params: any = {}

    let contactPersonToEdit: IContactPersonEdit = {
      id: contactPerson.id!,
      name: contactPerson.name,
      phone: contactPerson.phone,
      email: contactPerson.email,
      description: contactPerson.description
    };

    if (contactPerson) { params = JSON.parse(JSON.stringify(contactPersonToEdit)) }

    return this.httpClient.put<IContactPersonEdit>(this.contactPersonsEndpointUrl, params);
  }
}