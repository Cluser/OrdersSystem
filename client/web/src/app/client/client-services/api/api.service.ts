import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public loadData() {
    this.httpClient.get('http://127.0.0.1:8000/Clients/1').subscribe((response) => console.log(response))
  }
}
