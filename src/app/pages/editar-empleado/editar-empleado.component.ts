import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css'] // Corregido styleUrl a styleUrls
})
export class EditarEmpleadoComponent implements OnInit{

  elID:any;
  empleado:any;

  formularioDeEmpleado:FormGroup;

  userNombre:String="";
  userArea:String="";
  userCargo:String="";
 
  constructor(
    private activeRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private router: Router,
    public formulario: FormBuilder,
    private loginService: LoginService,
  ){
    this.elID = activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);

    this.formularioDeEmpleado = this.formulario.group({
      empleado_documento: ['', Validators.required],
      empleado_nombre: ['', Validators.required],
      empleado_area: ['', Validators.required],
      empleado_cargo: ['', Validators.required],
      empleado_fecha_nacimiento: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.empleadoService.getEmpleado(this.elID).subscribe(res => {
      console.log(res);
      this.empleado = res;
      // Se establece el valor del formulario con todos los campos necesarios
      this.formularioDeEmpleado.setValue({
        empleado_documento: this.empleado.empleado_documento || '',
        empleado_nombre: this.empleado.empleado_nombre || '',
        empleado_area: this.empleado.empleado_area || '',
        empleado_cargo: this.empleado.empleado_cargo || '',
        empleado_fecha_nacimiento: this.empleado.empleado_fecha_nacimiento || '',
        estado: this.empleado.estado || ''
      });
    });


    this.loginService.currentUserNombre.subscribe(respuesta => {
      this.userNombre = respuesta;
      const apruebaNombreControl = this.formularioDeEmpleado.get('aprueba_nombre');
      if (apruebaNombreControl) {
        apruebaNombreControl.setValue(this.userNombre);
      }
    });

    this.loginService.currentUserCargo.subscribe(respuesta => {
      this.userCargo = respuesta;
      const apruebaCargoControl = this.formularioDeEmpleado.get('aprueba_cargo');
      if (apruebaCargoControl) {
        apruebaCargoControl.setValue(this.userCargo);
      }
    });


  }

  enviarDatos(): any {
    this.empleadoService.updateEmpleado(this.elID, this.formularioDeEmpleado.value).subscribe(res => {
      this.router.navigateByUrl('/inicio');
    });
  }
}
