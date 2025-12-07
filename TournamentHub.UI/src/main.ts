import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { API_URL } from './app/app-injection-tokens';
import { environment } from './environments/environment.dev';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './app/shared/services/auth-service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from './app/shared/services/notification-service';
import { provideRouter } from '@angular/router';
import { tokenInterceptor } from './app/shared/interceptors/token-interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: JWT_OPTIONS, useValue: {} },
    JwtHelperService,
    NotificationService,
    AuthService
  ]
})
.catch(err => console.error(err));