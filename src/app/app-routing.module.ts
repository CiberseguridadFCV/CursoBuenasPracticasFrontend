import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AgregarSolicitudComponent } from './pages/agregar-solicitud/agregar-solicitud.component';
import { EditarSolicitudComponent } from './pages/editar-solicitud/editar-solicitud.component';

const routes: Routes = [
  {path: '', redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component:DashboardComponent},
  {path: 'iniciar-sesion', component:LoginComponent},
  {path: 'agregar-solicitud', component: AgregarSolicitudComponent},
  {path: 'ver-solicitud/:id', component: EditarSolicitudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
