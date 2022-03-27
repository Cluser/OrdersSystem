import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { AuthService } from '../shared/api/authentication/auth.service';
import { IAuthenticate } from '../shared/models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  public authData: Partial<IAuthenticate> = {}
  public wrongAuthData: boolean = false;

  ngOnInit(): void {
  }

  public login(authData: Partial<IAuthenticate>): void {
    this.spinner.show();
    this.authService.login(authData).pipe(
      map(response => response.access_token),
      tap(response => { 
        this.authService.accessToken = response;
        this.router.navigate(['main/purchase/items'], { queryParams: { archived: false }})
      }),
      finalize(() => this.spinner.hide()),
      catchError(error => throwError(() => {
        switch(error.status) {
          case 401:
            this.wrongAuthData = true
            console.log('Login error')
        }
        return error
      }))
    ).subscribe()
  }
}
