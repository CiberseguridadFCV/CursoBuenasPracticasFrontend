import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  Empleados:any;

  userLoginOn:boolean=false;

  userInfo:Object="";

  constructor(private loginService: LoginService, private empleadoService:EmpleadoService, public router:Router){}


  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });


    this.loginService.currentUserNombre.subscribe(respuesta =>{
      this.userInfo=respuesta;
      console.log(this.userInfo);
    })

    this.empleadoService.getEmpleados().pipe(
      catchError(error => {
        console.error('Error al obtener los empleados:', error);
        sessionStorage.removeItem("token");
        this.router.navigate(['/iniciar-sesion']);

        return of([]);
      })
    ).subscribe(respuesta => {
      console.log(respuesta);
      this.Empleados = respuesta;
    });

  }

}
