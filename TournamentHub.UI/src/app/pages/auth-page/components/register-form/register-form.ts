import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorMessage } from '../../../../shared/components/validator-message/validator-message';
import { AuthService } from '../../../../shared/services/auth-service';
import { RegisterRequest } from '../../../../shared/models/auth/register-request.model';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, ValidatorMessage],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  @Output() switchMode = new EventEmitter<'login'>();

  regForm: FormGroup;
  passwordsGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.regForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.email
      ]],
      userName: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        this.userNameValidator()
      ]],
      passwords: this.formBuilder.group({
        password: [null, [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(255)
        ]],
        confirmPassword: [null, [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(255),
        ]],
      }, { validators: this.passwordsAreEqual() })
    });
    this.passwordsGroup = this.regForm.get('passwords') as FormGroup;
  }

  onSubmit() {
    this.regForm.markAllAsTouched();

    const registerData: RegisterRequest = {
          userName: this.regForm.value.userName,
          email: this.regForm.value.email,
          password: this.regForm.value.passwords.password
        };
    
    if (this.regForm.valid) {
      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log(response);
          console.log("Успешная регистрация!");
        },
        error: (response) => {
          console.log(response);
          console.log("Провал регистрации!");
        }
      });
    }
  }

  goToLogin() {
    this.switchMode.emit('login');
  }

  private userNameValidator(): ValidatorFn {
    const pattern = /[^a-zA-ZА-Яа-яЁё_]/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control.dirty || control.touched)) {
        return null;
      }
      return pattern.test(control.value) ? { custom: 'Поле может содержать только буквы и нижнее подчёркивание' } : null;
    };
  }

  private passwordsAreEqual(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (!(group.dirty || group.touched) || password === confirmPassword) {
        return null;
      }
      return { custom: 'Пароли должны совпадать' };
    };
  }
}
