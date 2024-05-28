import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { CSP_NONCE } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    AgregarEmpleadoComponent,
    EditarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: JwtInterceptorService,multi:true },
    { provide:HTTP_INTERCEPTORS,useClass: ErrorInterceptorService, multi:true },
    { provide: CSP_NONCE, useFactory: () => (window as any)['nonce'], deps: [PLATFORM_ID] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
