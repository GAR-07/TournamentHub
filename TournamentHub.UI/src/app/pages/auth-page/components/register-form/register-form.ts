import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorMessage } from '../../../../shared/components/validator-message/validator-message';
import { AuthService } from '../../../../shared/services/auth-service';
import { RegisterRequest } from '../../../../shared/models/auth/register-request.model';
import { NotificationService } from '../../../../shared/services/notification-service';
import { NotificationMessage } from '../../../../shared/models/notification-Мessage.model';

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
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
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
      }, { validators: this.passwordMatchValidator })
    });
    this.passwordsGroup = this.regForm.get('passwords') as FormGroup;
  }

  onSubmit() {
    this.regForm.markAllAsTouched();

    if (!this.regForm.valid) return;

    const registerData: RegisterRequest = {
          userName: this.regForm.value.userName,
          email: this.regForm.value.email,
          password: this.regForm.value.passwords.password
        };
    
    this.authService.register(registerData).subscribe({
      next: () => {
        this.notificationService.addMessage(new NotificationMessage('Вы успешно зарегистрировались'));
      },
      error: (response) => {
        this.notificationService.addMessage(new NotificationMessage(response.error, response.status));
      }
    });
  }

  goToLogin() {
    this.switchMode.emit('login');
  }

  private userNameValidator(): ValidatorFn {
    const pattern = /[^a-zA-ZА-Яа-яЁё0-9_]/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control.dirty || control.touched)) {
        return null;
      }
      return pattern.test(control.value) ? { custom: 'Поле может содержать содержать только буквы, цифры и _' } : null;
    };
  }

  private passwordMatchValidator(): ValidatorFn {
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