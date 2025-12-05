import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterForm } from './components/register-form/register-form';
import { LoginForm } from './components/login-form/login-form';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RegisterForm, LoginForm],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  mode: string = 'login';

  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
  }
}
