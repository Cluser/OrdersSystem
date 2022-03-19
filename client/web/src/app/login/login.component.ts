import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/api/authentication/auth.service';
import { IAuthenticate } from '../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public authData: Partial<IAuthenticate> = {}

  ngOnInit(): void {
  }

  public login(authData: Partial<IAuthenticate>): void {
    this.authService.login(authData).subscribe(response => {
      this.authService.accessToken = response.access_token;
      this.router.navigate(['main/purchase/items'])
    })
  }

}
