import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit{

  formularioDeEmpleado:FormGroup;

  userNombre:String="";
  userArea:String="";
  userCargo:String="";


  constructor(
    private loginService: LoginService,
    public formulario: FormBuilder,
    private empleadoService: EmpleadoService,
    private router: Router
    )
    {
      this.formularioDeEmpleado=this.formulario.group({
        empleado_documento: ['',Validators.required],
        empleado_nombre: ['',Validators.required],
        empleado_area: ['',Validators.required],
        empleado_cargo: ['',Validators.required],
        empleado_fecha_nacimiento: ['',Validators.required],
      })
    }



  ngOnInit(): void {

  }

  enviarDatos():any {


    if(this.formularioDeEmpleado.valid){
      this.empleadoService.createEmpleado(this.formularioDeEmpleado.value).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('/inicio');
      }
        );

    }else{
      this.formularioDeEmpleado.markAllAsTouched();
      alert("Error al ingresar los datos");
    }


  }

}
