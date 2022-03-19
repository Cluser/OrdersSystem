import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAuthenticate } from '../../models';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.apiUrl;
    private authenticateEndpointUrl: string = this.apiUrl + '/token'
    public accessToken = "";
    public accessTokenRefresh = false;


    constructor(private http: HttpClient, public router: Router, private cookieService: CookieService) { }

    public login(user: Partial<IAuthenticate>): Observable<any> {
        let params: any = new FormData();
        params.append("username", user?.username);
        params.append("password", user?.password);
        params.append("scope", "admin purchase statistics");

        return this.http.post<Partial<IAuthenticate>>(this.authenticateEndpointUrl, params, { withCredentials: true })
    }

    public logout(): Observable<any> {
        return this.http.post(this.apiUrl + '/logout', {}, { withCredentials: true })
    }

    public refreshToken(): Observable<any> {
        return this.http.post<Partial<IAuthenticate>>(this.apiUrl + "/refreshToken", null, { withCredentials: true })
    }
    
    public getToken() {
        return this.accessToken;       
    }

    public accessTokenExpired(): boolean {
        if (this.getToken()) {
            return new JwtHelperService().isTokenExpired(this.getToken());
        } else { 
            return true
        }

    }

    public getLoggedInUser(): Observable<any> {
        return this.http.get<Partial<any>>(this.apiUrl + "/getLogedInUser")
    }

    public get isLoggedIn(): boolean {
        return !this.accessTokenExpired();
    }
}