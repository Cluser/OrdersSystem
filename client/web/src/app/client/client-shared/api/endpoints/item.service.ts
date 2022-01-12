import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem, IItemEdit, IPItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Item {

  private apiUrl: string = environment.apiUrl;
  private ItemsEndpointUrl: string = this.apiUrl + '/Items'


  constructor(private httpClient: HttpClient) { 
  }

  
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
      category: item.category,
      quantity: item.quantity,
      comment: item.comment,
      status: item.status,
      idProject: item.idProject,
      idUser: item.idUser
    };

    if (item) { params = JSON.parse(JSON.stringify(itemToEdit)) }

    return this.httpClient.put<IItemEdit>(this.ItemsEndpointUrl, params);
  }
}