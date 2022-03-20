import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
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
    this.authService.login(authData).pipe(
      map(response => response.access_token),
      tap(response => { 
        this.authService.accessToken = response;
        this.router.navigate(['main/purchase/items'])
      })
    ).subscribe()
  }
}
