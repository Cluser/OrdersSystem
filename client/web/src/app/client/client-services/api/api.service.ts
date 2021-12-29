import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = 'http://127.0.0.1:8000'

  constructor(private httpClient: HttpClient) { 
  }

  public loadData() {
    this.httpClient.get(this.apiUrl + '/Clients/1').subscribe((response) => console.log(response))
  }
}
