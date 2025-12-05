import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorMessage } from '../../../../shared/components/validator-message/validator-message';
import { AuthService } from '../../../../shared/services/auth-service';
import { LoginRequest } from '../../../../shared/models/auth/login-request.model';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, ValidatorMessage],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  @Output() switchMode = new EventEmitter<'register'>();

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm= this.formBuilder.group({
      login: [null, [
        Validators.required,
        Validators.maxLength(255)
      ]],
      password: [null, [
        Validators.required,
        Validators.maxLength(255)
      ]],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    const loginData: LoginRequest = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };

    if (this.loginForm.valid) {
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          console.log("Успешная авторизация!");
        },
        error: (response) => {
          console.log(response);
          console.log("Провал авторизации!");
        }
      });
    }
  }

  goToRegister() {
    this.switchMode.emit('register');
  }
}