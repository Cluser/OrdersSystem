import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IClientEdit, IPClient } from '../../models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Client {

  private apiUrl: string = environment.apiUrl;
  private clientsEndpointUrl: string = this.apiUrl + '/Clients'

  constructor(private httpClient: HttpClient) { 
  }

  
  ////////////////////////////////////////////////////////////
  // CLIENTS
  ////////////////////////////////////////////////////////////
  public getClients(client?: IClient, page?: number, size?: number): Observable<IPClient> {
    let params: any = {};
    params = Object.assign(JSON.parse(JSON.stringify(client)), {'page': page, 'size': size})

    return this.httpClient.get<IPClient>(this.clientsEndpointUrl, {params: params});
  }

  public addClients(client?: IClient): Observable<IClient[]> {
    let params: any = {};

    if (client) { params = JSON.parse(JSON.stringify(client)) }

    return this.httpClient.post<IClient[]>(this.clientsEndpointUrl, params);
  }

  public editClient(client: IClient): Observable<IClientEdit> {
    let params: any = {}

    let clientToEdit: IClientEdit = {
      id: client.id!,
      name: client.name,
      address: client.address,
      email: client.email,
      phone: client.phone,
      description: client.description
    };

    if (client) { params = JSON.parse(JSON.stringify(clientToEdit)) }

    return this.httpClient.put<IClientEdit>(this.clientsEndpointUrl, params);
  }
}