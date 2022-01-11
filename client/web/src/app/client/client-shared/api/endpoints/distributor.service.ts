import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDistributor, IPDistributor } from '../../models/models';


@Injectable({
  providedIn: 'root'
})
export class Distributor {

  private apiUrl: string = 'http://127.0.0.1:8000'
  private distributorsEndpointUrl: string = this.apiUrl + '/Distributors'


  constructor(private httpClient: HttpClient) { 
  }

  public getDistributors(distributor?: IDistributor, page?: number, size?: number): Observable<IPDistributor> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(distributor)), {'page': page, 'size': size})

    return this.httpClient.get<IPDistributor>(this.distributorsEndpointUrl, {params: params});
  }

}