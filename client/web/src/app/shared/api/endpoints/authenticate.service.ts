import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthenticate } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Authenticate {

  private apiUrl: string = environment.apiUrl;
  private authenticateEndpointUrl: string = this.apiUrl + '/token'


  constructor(private httpClient: HttpClient) { 
  }


  public login(auth?: Partial<IAuthenticate>): Observable<IAuthenticate> {
    let params: any = new FormData();

    params.append("username", auth?.username);
    params.append("password", auth?.password);

    return this.httpClient.post<IAuthenticate>(this.authenticateEndpointUrl, params);
  }

}