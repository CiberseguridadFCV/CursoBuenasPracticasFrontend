import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-solicitud',
  templateUrl: './agregar-solicitud.component.html',
  styleUrl: './agregar-solicitud.component.css'
})
export class AgregarSolicitudComponent implements OnInit{

  formularioDeSolicitud:FormGroup;

  userNombre:String="";
  userArea:String="";
  userCargo:String="";


  constructor(
    private loginService: LoginService,
    public formulario: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router
    )
    {
      this.formularioDeSolicitud=this.formulario.group({
        solicitante_nombre: ['',Validators.required],
        solicitante_area: ['',Validators.required],
        solicitante_cargo: ['',Validators.required],
        justificacion: ['',Validators.required],
        fecha_inicio: ['',Validators.required],
        fecha_fin: ['',Validators.required],
        destinatario_nombre: ['',Validators.required],
        destinatario_cargo: ['',Validators.required],
        destinatario_area: ['',Validators.required],
        destinatario_usuario: ['',Validators.required],
      })
    }



  ngOnInit(): void {

    this.loginService.currentUserNombre.subscribe(respuesta => {
      this.userNombre = respuesta;
      const solicitanteNombreControl = this.formularioDeSolicitud.get('solicitante_nombre');
      if (solicitanteNombreControl) {
        solicitanteNombreControl.setValue(this.userNombre);
      }
    });

    this.loginService.currentUserCargo.subscribe(respuesta => {
      this.userCargo = respuesta;
      const solicitanteCargoControl = this.formularioDeSolicitud.get('solicitante_cargo');
      if (solicitanteCargoControl) {
        solicitanteCargoControl.setValue(this.userCargo);
      }
    });

    this.loginService.currentUserArea.subscribe(respuesta => {
      this.userArea = respuesta;
      const solicitanteAreaControl = this.formularioDeSolicitud.get('solicitante_area');
      if (solicitanteAreaControl) {
        solicitanteAreaControl.setValue(this.userArea);
      }
    });

  }

  enviarDatos():any {


    if(this.formularioDeSolicitud.valid){
      this.solicitudService.createSolicitud(this.formularioDeSolicitud.value).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('/inicio');
      }
        );

    }else{
      this.formularioDeSolicitud.markAllAsTouched();
      alert("Error al ingresar los datos");
    }


  }

}
