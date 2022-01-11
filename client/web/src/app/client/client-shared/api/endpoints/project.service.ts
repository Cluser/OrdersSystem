import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOffer, IOfferCreate, IOfferItemCreate, IOrder, IOrderCreate, IOrderItemCreate, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class Project {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private projectsEndpointUrl: string = this.apiUrl + '/Projects'


  constructor(private httpClient: HttpClient) { 
  }

  
  public getProjects(project?: IProject, page?: number, size?: number): Observable<IPProject> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(project)), {'page': page, 'size': size})

    return this.httpClient.get<IPProject>(this.projectsEndpointUrl, {params: params});
  }

  public addProjects(project?: IProject): Observable<IProject[]> {
    let params: any = {}

    if (project) { params = JSON.parse(JSON.stringify(project)) }

    return this.httpClient.post<IProject[]>(this.projectsEndpointUrl, params);
  }
}