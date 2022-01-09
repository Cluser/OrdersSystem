import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient, IDistributor, IInquiry, IInquiryCreate, IInquiryItemCreate, IItem, IItemCreate, IItemEdit, IOrder, IPClient, IPDistributor, IPInquiry, IPItem, IPOrder, IPProject, IProject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private clientsEndpointUrl: string = this.apiUrl + '/Clients'
  private projectsEndpointUrl: string = this.apiUrl + '/Projects'
  private ItemsEndpointUrl: string = this.apiUrl + '/Items'
  private distributorsEndpointUrl: string = this.apiUrl + '/Distributors'
  private inquiriesEndpointUrl: string = this.apiUrl + '/Inquiries'
  private ordersEndpointUrl: string = this.apiUrl + '/Orders'
  private inquiriesItemsEndpointUrl: string = this.apiUrl + '/InquiriesItems'

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


  ////////////////////////////////////////////////////////////
  // PROJECTS
  ////////////////////////////////////////////////////////////
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


  ////////////////////////////////////////////////////////////
  // ITEMS TO ORDER
  ////////////////////////////////////////////////////////////
  public getItems(Item?: IItem, page?: number, size?: number): Observable<IPItem> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(Item)), {'page': page, 'size': size})

    return this.httpClient.get<IPItem>(this.ItemsEndpointUrl, {params: params});
  }

  public addItems(Item: IItem): Observable<IItem[]> {
    let params: any = {}

    if (Item) { params = JSON.parse(JSON.stringify(Item)) }

    return this.httpClient.post<IItem[]>(this.ItemsEndpointUrl, params);
  }

  public editItem(item: IItem): Observable<IItemEdit> {
    let params: any = {}

    let itemToEdit: IItemEdit = {
      id: item.id!,
      name: item.name,
      quantity: item.quantity,
      status: item.status,
      idProject: item.idProject,
      idUser: item.idUser
    };

    if (item) { params = JSON.parse(JSON.stringify(itemToEdit)) }

    return this.httpClient.put<IItemEdit>(this.ItemsEndpointUrl, params);
  }


  ////////////////////////////////////////////////////////////
  // DISTRIBUTORS
  ////////////////////////////////////////////////////////////
  public getDistributors(distributor?: IDistributor, page?: number, size?: number): Observable<IPDistributor> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(distributor)), {'page': page, 'size': size})

    return this.httpClient.get<IPDistributor>(this.distributorsEndpointUrl, {params: params});
  }


  ////////////////////////////////////////////////////////////
  // Inquiries
  ////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////
  // Inquiries Items
  ////////////////////////////////////////////////////////////
  public addInquiryItems(item: IItem[], inquiry: IInquiry, quantity: number, status: string): Observable<IInquiryItemCreate[]> {
    let params: any = {}

    let inquiryItems: IInquiryItemCreate[] = []

    item.forEach(item => {
      let inquiryItem: IInquiryItemCreate = {
        Item_id: item.id,
        inquiry_id: inquiry.id,
        quantity: item.quantity,
        status: item.status,
      };
      inquiryItems.push(inquiryItem)
    })


    if (inquiry) { params = JSON.parse(JSON.stringify(inquiryItems)) }

    return this.httpClient.post<IInquiryItemCreate[]>(this.inquiriesItemsEndpointUrl, params);
  }


  ////////////////////////////////////////////////////////////
  // Orders
  ////////////////////////////////////////////////////////////
  public getOrders(order?: IOrder, page?: number, size?: number): Observable<IPOrder> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(order)), {'page': page, 'size': size})

    return this.httpClient.get<IPOrder>(this.ordersEndpointUrl, {params: params});
  }
}


