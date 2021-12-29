import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private clientsEndpointUrl: string = this.apiUrl + '/Clients'
  private projectsEndpointUrl: string = this.apiUrl + '/Clients'

  constructor(private httpClient: HttpClient) { 
  }

  public getClients(id?: number, name?: string): Observable<IClient[]> {
    let params: any = {}

    if (id) params.id = id;
    if (name) params.name = name;

    return this.httpClient.get<IClient[]>(this.clientsEndpointUrl, {params: params});
  }
}
