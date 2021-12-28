import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  ngOnInit(): void {

  }

  private loadData() {
    this.httpClient.get('http://127.0.0.1:8000/Clients/1').subscribe((response) => console.log(response))
  }

}
