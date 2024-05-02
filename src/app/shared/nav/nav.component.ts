import { Router } from '@angular/router';
import { LoginService } from './../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  userLoginOn:boolean=false;

  constructor(private loginService: LoginService, private router: Router
    ){}

  ngOnInit(): void {

    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {

          this.userLoginOn=userLoginOn;

        }
      }
    )

  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/iniciar-sesion']);

  }

}
