import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAuthenticate } from '../../models';
import { CookieService } from 'ngx-cookie-service';


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
        params.append("scope", "purchase")

        return this.http.post<Partial<IAuthenticate>>(this.authenticateEndpointUrl, params, { withCredentials: true }).subscribe((res: any) => {
            this.accessToken = res.access_token;
            this.router.navigate(['main/purchase/items'])
        })
    }

    public getToken() {
        if (this.accessToken) return this.accessToken; else return ""        
    }

    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        var now = new Date;
        var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
              now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        return (Math.floor(utc_timestamp / 1000)) >= expiry;
    }

    public get isLoggedIn(): boolean {
        return (this.tokenExpired(this.accessToken)) ? false : true
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