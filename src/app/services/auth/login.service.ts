import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserNombre: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserCargo: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserArea: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn.next(sessionStorage.getItem("token") !== null);
    this.currentUserData.next(sessionStorage.getItem("token") || "");
    this.currentUserNombre.next(localStorage.getItem("NombreUsuario") || '');
    this.currentUserCargo.next(localStorage.getItem("CargoUsuario") || '');
    this.currentUserArea.next(localStorage.getItem("AreaUsuario") || '');
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "auth/login", credentials).pipe(
      tap(userData => {
        sessionStorage.setItem("token", userData.token);
        localStorage.setItem("NombreUsuario", userData.nombreusuario);
        localStorage.setItem("CargoUsuario", userData.cargousuario);
        localStorage.setItem("AreaUsuario", userData.areausuario);
        this.currentUserData.next(userData.token);
        this.currentUserNombre.next(userData.nombreusuario);
        this.currentUserCargo.next(userData.cargousuario);
        this.currentUserArea.next(userData.areausuario);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    localStorage.removeItem("NombreUsuario");
    localStorage.removeItem("CargoUsuario");
    localStorage.removeItem("AreaUsuario");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.log('Se ha producido un error ', error.error);
    } else {
      console.log('Backend retornó el código de estado ', error);
    }

    return throwError(() => new Error('Algo falló. Por favor, inténtelo nuevamente'));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userNombre(): Observable<Object> {
    return this.currentUserNombre.asObservable();
  }

  get userArea(): Observable<Object> {
    return this.currentUserArea.asObservable();
  }

  get userCargo(): Observable<Object> {
    return this.currentUserCargo.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }

  set userToken(token: string) {
    this.userToken = token;
  }
}
