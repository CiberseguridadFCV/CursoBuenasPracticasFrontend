import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService, private router : Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String=this.loginService.userToken;

    if(token!=""){
      req=req.clone(
        {
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.loginService.userToken = '';
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );

  }
}
