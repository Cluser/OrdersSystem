import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api/api.service';
import { AuthService } from '../shared/api/authentication/auth.service';
import { IAuthenticate, IUser } from '../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public user: Partial<IAuthenticate> = {}

  ngOnInit(): void {
  }

  public login(user: Partial<IAuthenticate>): void {
    this.auth.login(user)
  }

}
