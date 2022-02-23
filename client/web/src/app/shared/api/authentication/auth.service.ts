import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAuthenticate } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.apiUrl;
    private authenticateEndpointUrl: string = this.apiUrl + '/token'
    private endpoint: string = this.authenticateEndpointUrl;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser = {};

    constructor(private http: HttpClient, public router: Router) { }

    // Sign-in
    public signIn(user: Partial<IAuthenticate>) {

        let params: any = new FormData();

        params.append("username", user?.username);
        params.append("password", user?.password);

        return this.http.post<Partial<IAuthenticate>>(this.authenticateEndpointUrl, params).subscribe((res: any) => {
            localStorage.setItem('access_token', res.access_token)
            this.router.navigate(['main/purchase/items'])
        })
    }

    public getToken() {
        return localStorage.getItem('access_token');
    }

    public get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
    }

    public doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
        this.router.navigate(['login']);
        }
    }

    public handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
    }
}