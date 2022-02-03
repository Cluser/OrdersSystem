import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem, IPItem } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Item {

  private apiUrl: string = environment.apiUrl;
  private ItemsEndpointUrl: string = this.apiUrl + '/Items'


  constructor(private httpClient: HttpClient) { 
  }

  
  public getItems(Item?: IItem, dateAndTimeStart?: string, dateAndTimeEnd?: string, page?: number, size?: number): Observable<IPItem> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(Item)), {'dateAndTimeStart': dateAndTimeStart, 'dateAndTimeEnd': dateAndTimeEnd, 'page': page, 'size': size})

    return this.httpClient.get<IPItem>(this.ItemsEndpointUrl, {params: params});
  }

  public addItems(Item: Partial<IItem>): Observable<IItem[]> {
    let params: any = {}

    if (Item) { params = JSON.parse(JSON.stringify(Item)) }

    return this.httpClient.post<IItem[]>(this.ItemsEndpointUrl, params);
  }

  public editItem(item: Partial<IItem>): Observable<IItem> {
    let params: any = {}

    if (item) { params = JSON.parse(JSON.stringify(item)) }

    return this.httpClient.put<IItem>(this.ItemsEndpointUrl, params);
  }
}