import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IPUser } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User {

  private apiUrl: string = environment.apiUrl;
  private usersEndpointUrl: string = this.apiUrl + '/Users'


  constructor(private httpClient: HttpClient) { 
  }

  
  public getUsers(user?: IUser, page?: number, size?: number): Observable<IPUser> {
    let params: any = {}
    params = Object.assign(JSON.parse(JSON.stringify(user)), {'page': page, 'size': size})

    return this.httpClient.get<IPUser>(this.usersEndpointUrl, {params: params});
  }

  public addUser(user?: Partial<IUser>): Observable<IUser[]> {
    let params: any = {}

    if (user) { params = JSON.parse(JSON.stringify(user)) }

    return this.httpClient.post<IUser[]>(this.usersEndpointUrl, params);
  }

  public editUser(user: Partial<IUser>): Observable<IUser> {
    let params: any = {}

    if (user) { params = JSON.parse(JSON.stringify(user)) }

    return this.httpClient.put<IUser>(this.usersEndpointUrl, params);
  }
}