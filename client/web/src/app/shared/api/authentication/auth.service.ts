import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAuthenticate } from '../../models';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.apiUrl;
    private authenticateEndpointUrl: string = this.apiUrl + '/token'
    private endpoint: string = this.authenticateEndpointUrl;
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser = {};

    constructor(private http: HttpClient, public router: Router, private cookieService: CookieService) { }

    // Sign-in
    public signIn(user: Partial<IAuthenticate>) {

        let params: any = new FormData();

        params.append("username", user?.username);
        params.append("password", user?.password);

        return this.http.post<Partial<IAuthenticate>>(this.authenticateEndpointUrl, params).subscribe((res: any) => {
            this.cookieService.set('access_token', res.access_token);
            this.router.navigate(['main/purchase/items'])
        })
    }

    public getToken() {
        return this.cookieService.get('access_token');
    }

    public get isLoggedIn(): boolean {
        let authToken = this.cookieService.get('access_token');
        return (authToken.length > 0) ? true : false;
    }

    public getUserData() {
        const token = this.cookieService.get('access_token');
        const decodedToken = jwt_decode(token)
        return decodedToken;
    }

    public doLogout() {
        this.cookieService.set('access_token', '')
        this.router.navigate(['login']);
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