import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  Solicitudes:any;

  userLoginOn:boolean=false;

  userInfo:Object="";

  constructor(private loginService: LoginService, private solicitudService:SolicitudService, public router:Router){}


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

    this.solicitudService.getSolicitudes().pipe(
      catchError(error => {
        console.error('Error al obtener solicitudes:', error);
        sessionStorage.removeItem("token");
        this.router.navigate(['/iniciar-sesion']);

        return of([]);
      })
    ).subscribe(respuesta => {
      console.log(respuesta);
      this.Solicitudes = respuesta;
    });

  }

}
