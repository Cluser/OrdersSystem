import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, filter, map, Observable, take, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isLoggedIn == true) {
      return true
    } 
    else {
      return this.authService.refreshToken().pipe(
        take(1),
        filter(token => token.access_token),
        tap(token => this.authService.accessToken = token),
        map(() => { 
          if (this.authService.isLoggedIn) { return true; } else { this.router.navigateByUrl('/login'); return false; }
        }),
        catchError((err: Response) => {
            this.router.navigateByUrl('/login');
            return throwError(() => err.statusText);
        })
      )
    }
  }
}