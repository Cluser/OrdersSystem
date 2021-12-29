import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IItemToOrder, IProject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private clientsEndpointUrl: string = this.apiUrl + '/Clients'
  private projectsEndpointUrl: string = this.apiUrl + '/Projects'
  private itemsToOrderEndpointUrl: string = this.apiUrl + '/ItemsToOrder'
  private distributorsEndpointUrl: string = this.apiUrl + '/Distributors'

  constructor(private httpClient: HttpClient) { 
  }

  
  public getClients(client?: IClient): Observable<IClient[]> {
    let params: any = {};

    if (client) { params = JSON.parse(JSON.stringify(client)) }

    return this.httpClient.get<IClient[]>(this.clientsEndpointUrl, {params: params});
  }

  public getProjects(project?: IProject): Observable<IProject[]> {
    let params: any = {}

    if (project) { params = JSON.parse(JSON.stringify(project)) }

    return this.httpClient.get<IProject[]>(this.projectsEndpointUrl, {params: params});
  }

  public getItemsToOrder(itemToOrder?: IItemToOrder): Observable<IItemToOrder[]> {
    let params: any = {}

    if (itemToOrder) { params = JSON.parse(JSON.stringify(itemToOrder)) }

    return this.httpClient.get<IItemToOrder[]>(this.itemsToOrderEndpointUrl, {params: params});
  }

  public getDistributors(distributor?: IDistributor): Observable<IDistributor[]> {
    let params: any = {}

    if (distributor) { params = JSON.parse(JSON.stringify(distributor)) }

    return this.httpClient.get<IDistributor[]>(this.distributorsEndpointUrl, {params: params});
  }
}