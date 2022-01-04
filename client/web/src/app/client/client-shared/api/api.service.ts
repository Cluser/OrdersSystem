import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IItem, IProject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private clientsEndpointUrl: string = this.apiUrl + '/Clients'
  private projectsEndpointUrl: string = this.apiUrl + '/Projects'
  private ItemsEndpointUrl: string = this.apiUrl + '/Items'
  private distributorsEndpointUrl: string = this.apiUrl + '/Distributors'

  constructor(private httpClient: HttpClient) { 
  }

  
  ////////////////////////////////////////////////////////////
  // CLIENTS
  ////////////////////////////////////////////////////////////
  public getClients(client?: IClient): Observable<IClient[]> {
    let params: any = {};

    if (client) { params = JSON.parse(JSON.stringify(client)) }

    return this.httpClient.get<IClient[]>(this.clientsEndpointUrl, {params: params});
  }

  public addClients(client?: IClient): Observable<IClient[]> {
    let params: any = {};

    if (client) { params = JSON.parse(JSON.stringify(client)) }

    return this.httpClient.post<IClient[]>(this.clientsEndpointUrl, params);
  }


  ////////////////////////////////////////////////////////////
  // PROJECTS
  ////////////////////////////////////////////////////////////
  public getProjects(project?: IProject): Observable<IProject[]> {
    let params: any = {}

    if (project) { params = JSON.parse(JSON.stringify(project)) }

    return this.httpClient.get<IProject[]>(this.projectsEndpointUrl, {params: params});
  }

  public addProjects(project?: IProject): Observable<IProject[]> {
    let params: any = {}

    if (project) { params = JSON.parse(JSON.stringify(project)) }

    return this.httpClient.post<IProject[]>(this.projectsEndpointUrl, params);
  }


  ////////////////////////////////////////////////////////////
  // ITEMS TO ORDER
  ////////////////////////////////////////////////////////////
  public getItems(Item?: IItem): Observable<IItem[]> {
    let params: any = {}

    if (Item) { params = JSON.parse(JSON.stringify(Item)) }

    return this.httpClient.get<IItem[]>(this.ItemsEndpointUrl, {params: params});
  }

  public addItems(Item?: IItem): Observable<IItem[]> {
    let params: any = {}

    if (Item) { params = JSON.parse(JSON.stringify(Item)) }

    return this.httpClient.post<IItem[]>(this.ItemsEndpointUrl, params);
  }


  ////////////////////////////////////////////////////////////
  // DISTRIBUTORS
  ////////////////////////////////////////////////////////////
  public getDistributors(distributor?: IDistributor): Observable<IDistributor[]> {
    let params: any = {}

    if (distributor) { params = JSON.parse(JSON.stringify(distributor)) }

    return this.httpClient.get<IDistributor[]>(this.distributorsEndpointUrl, {params: params});
  }
}