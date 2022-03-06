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
    private accessToken = "";

    constructor(private http: HttpClient, public router: Router, private cookieService: CookieService) { }

    public login(user: Partial<IAuthenticate>) {

        let params: any = new FormData();

        params.append("username", user?.username);
        params.append("password", user?.password);

        return this.http.post<Partial<IAuthenticate>>(this.authenticateEndpointUrl, params, { withCredentials: true }).subscribe((res: any) => {
            this.accessToken = res.access_token;
            console.log(this.accessToken);
            this.router.navigate(['main/purchase/items'])
        })
    }

    public getToken() {
        if (this.accessToken) return this.accessToken; else return ""        
    }

    public get isLoggedIn(): boolean {
        // let authToken = this.cookieService.get('access_token');
        // return (authToken) ? true : false;
        return true;
    }

    public logout() {
        return this.http.post(this.apiUrl + '/logout', {}, { withCredentials: true }).subscribe((res: any) => {
            console.log(res)
            this.router.navigate(['login']);
        })
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