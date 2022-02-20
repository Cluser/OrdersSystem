import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api/api.service';
import { IAuthenticate, IUser } from '../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,) { }

  user: Partial<IAuthenticate> = {}

  ngOnInit(): void {
  }

  public login(user: Partial<IAuthenticate>): void {
    this.api.authenticate.login(user).subscribe((respone) => console.log(respone));
  }

}
