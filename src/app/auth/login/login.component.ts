import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";

  loginForm = this.formBuilder.group({
    usuarioemail: ['', [Validators.required, Validators.email]],
    usuariopassword: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const appRoot = document.querySelector('app-root');
    const nonce = appRoot ? appRoot.getAttribute('ngCspNonce') : '';

    if (nonce) {
      const style = this.renderer.createElement('style');
      this.renderer.setAttribute(style, 'nonce', nonce);
      this.renderer.appendChild(document.head, style);
      style.textContent = `
        .centrar {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background: #ececec;
        }
        .box-area {
          width: 930px;
        }
        .right-box {
          padding: 40px 30px 40px 40px;
        }
        ::placeholder {
          font-size: 16px;
        }
        .rounded-4 {
          border-radius: 20px;
        }
        .rounded-5 {
          border-radius: 30px;
        }
        @media only screen and (max-width: 768px) {
          .box-area {
            margin: 0 10px;
          }
          .left-box {
            height: 100px;
            overflow: hidden;
          }
          .right-box {
            padding: 20px;
          }
        }
      `;
    }
  }

  get email() {
    return this.loginForm.controls.usuarioemail;
  }

  get password() {
    return this.loginForm.controls.usuariopassword;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.info("login incompleto");
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos");
    }
  }
}
