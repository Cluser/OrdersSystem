import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, throwError, switchMap, BehaviorSubject, filter, take } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, public router: Router) { }

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private handleAuthError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler) {
        if (!this.authService.accessTokenRefresh) {
            this.authService.accessTokenRefresh = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token) => {
                    this.authService.accessTokenRefresh = false;
                    this.authService.accessToken = token.access_token;
                    this.refreshTokenSubject.next(token.access_token);
                    return next.handle(this.setHeader(req));
                }),
                catchError((err) => {
                    this.authService.accessTokenRefresh = false;
                    this.authService.logout();
                    return throwError(err);
                })
            )

        };
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(() => next.handle(this.setHeader(req)))
        );

    }
    
    private setHeader(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({ headers: request.headers.set("Authorization", "Bearer " + this.authService.getToken()) });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = this.setHeader(request)
        return next.handle(request).pipe(catchError(error => this.handleAuthError(error, request, next)));
    }
}