import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorMessage } from '../../../../shared/components/validator-message/validator-message';
import { AuthService } from '../../../../shared/services/auth-service';
import { NotificationService } from '../../../../shared/services/notification-service';
import { NotificationMessage } from '../../../../shared/models/notification-Мessage.model';
import { ChangePasswordRequest } from '../../../../shared/models/auth/сhange-password-request.model';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, ValidatorMessage],
  templateUrl: './change-password-form.html',
  styleUrl: './change-password-form.scss',
})
export class ChangePasswordForm {
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: [null, [
        Validators.required,
        Validators.maxLength(255)
      ]],
      newPassword: [null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(12)
      ]],
      confirmPassword: [null, [
        Validators.required
      ]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('newPassword')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (!password || !confirmPassword) return null;

      if (password === confirmPassword) {
        return null;
      }
      return { custom: 'Пароли должны совпадать' };
    };
  }

  onSubmit() {
    this.passwordForm.markAllAsTouched();

    if (!this.passwordForm.valid) return;

    const request: ChangePasswordRequest = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    this.authService.changePassword(request).subscribe({
      next: () => {
        this.notificationService.addMessage(new NotificationMessage('Пароль успешно изменён'));
      },
      error: (response) => {
        this.notificationService.addMessage(new NotificationMessage(response.error, response.status));
      }
    });
  }
}
