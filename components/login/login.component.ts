import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formulario!: FormGroup;
  currentLocale = 'en';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    /* this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }) */

    this.formulario = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  doLogin() {
    const username = this.formulario.get('username')?.value;
    const password = this.formulario.get('password')?.value;
    this.authService.login(username, password).subscribe({
      next: (respuesta: any) => {
        this.snackBar.open(
          'Se ha identificado correctamente. Bienvenido',
          'Gracias',
          {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
        this.authService.isLogged = true;
        this.router.navigate(['/']);
      },
      error: (error) => {
        let mensaje = '';
        switch (error.status) {
          case 400:
            mensaje = 'Nombre de usuario o contraseña inválidos';
            break;

          default:
            mensaje = 'Se ha producido un error';
            break;
        }

        this.snackBar.open(mensaje, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  changeLanguage(event: Event) {
    const language = (event.target as HTMLTextAreaElement).value;
    this.translate.use(language);
    this.currentLocale = language;

    if (language === 'es') {
      this.currentLocale = 'es-ES';
    } else {
      this.currentLocale = 'en-US';
    }
  }
}
