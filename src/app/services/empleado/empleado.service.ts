
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Empleado } from './empleado';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getEmpleado(id:number):Observable<Empleado>{
    return this.http.get<Empleado>(environment.urlApi + "empleado/listar/" + id ).pipe(
      catchError(this.handleError)
    )
  }

  getEmpleados():Observable<Empleado>{
    return this.http.get<Empleado>(environment.urlApi + "empleado/listar" ).pipe(
      catchError(this.handleError)
    )
  }

  createEmpleado(datosEmpleado:Empleado):Observable<any>{
    return this.http.post(environment.urlApi + "empleado/crear",datosEmpleado);
  }

  updateEmpleado(id:any, datosEmpleado:Empleado):Observable<any>{
    return this.http.put(environment.urlApi + "empleado/editar/" + id,datosEmpleado);
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
