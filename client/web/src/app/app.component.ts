import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.httpClient.get('http://127.0.0.1:8000/Clients/1').subscribe((response) => console.log(response))
  }

}
