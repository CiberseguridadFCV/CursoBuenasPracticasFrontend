import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud/solicitud.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrl: './editar-solicitud.component.css'
})
export class EditarSolicitudComponent implements OnInit{

  elID:any;
  solicitud:any;

  formularioDeSolicitud:FormGroup;

  userNombre:String="";
  userArea:String="";
  userCargo:String="";

  constructor(
    private activeRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private router: Router,
    public formulario: FormBuilder,
    private loginService: LoginService,
  ){
    this.elID=activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);

    this.formularioDeSolicitud=this.formulario.group({
      aprueba_cargo: ['',Validators.required],
      aprueba_nombre: ['',Validators.required],
      estado: ['',Validators.required],
    })

  }

  ngOnInit(): void {

    this.solicitudService.getSolicitud(this.elID).subscribe(res => {
      console.log(res);
      this.solicitud=res;
      this.formularioDeSolicitud.setValue({
        estado:res.estado,
        aprueba_cargo:this.userCargo,
        aprueba_nombre:this.userNombre
      })
    });


    this.loginService.currentUserNombre.subscribe(respuesta => {
      this.userNombre = respuesta;
      const apruebaNombreControl = this.formularioDeSolicitud.get('aprueba_nombre');
      if (apruebaNombreControl) {
        apruebaNombreControl.setValue(this.userNombre);
      }
    });

    this.loginService.currentUserCargo.subscribe(respuesta => {
      this.userCargo = respuesta;
      const apruebaCargoControl = this.formularioDeSolicitud.get('aprueba_cargo');
      if (apruebaCargoControl) {
        apruebaCargoControl.setValue(this.userCargo);
      }
    });



  }

  enviarDatos():any {
    this.solicitudService.updateSolicitud(this.elID, this.formularioDeSolicitud.value).subscribe(res=>{
      this.router.navigateByUrl('/inicio');
    })
  }

}
