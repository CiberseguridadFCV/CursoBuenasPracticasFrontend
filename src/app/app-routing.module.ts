import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

const routes: Routes = [
  {path: '', redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component:DashboardComponent},
  {path: 'iniciar-sesion', component:LoginComponent},
  {path: 'agregar-empleado', component: AgregarEmpleadoComponent},
  {path: 'ver-empleado/:id', component: EditarEmpleadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
