
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Solicitud } from './solicitud';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  getSolicitud(id:number):Observable<Solicitud>{
    return this.http.get<Solicitud>(environment.urlApi + "solicitud/listar/" + id ).pipe(
      catchError(this.handleError)
    )
  }

  getSolicitudes():Observable<Solicitud>{
    return this.http.get<Solicitud>(environment.urlApi + "solicitud/listar" ).pipe(
      catchError(this.handleError)
    )
  }

  createSolicitud(datosSolicitud:Solicitud):Observable<any>{
    return this.http.post(environment.urlApi + "solicitud/crear",datosSolicitud);
  }

  updateSolicitud(id:any, datosSolicitud:Solicitud):Observable<any>{
    return this.http.put(environment.urlApi + "solicitud/editar/" + id,datosSolicitud);
  }


  private handleError(error: HttpErrorResponse){
    if(error.status==0){
      console.log('se ha producido un error ', error.error);
    }else{
      console.log('Backend retorno el codigo de estado ', error.status, error.error);
    }

    return throwError( () => new Error('Algo fallo. Por favor intente nuevamente'));

  }

}
