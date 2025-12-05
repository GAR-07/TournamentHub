import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const isAuthRequest =
    req.url.includes('/Auth/Login') ||
    req.url.includes('/Auth/Register');

  let updatedReq = req;

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token && !isAuthRequest) {
    updatedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Обработка ошибок сервера (например, 401)
  return next(updatedReq).pipe(
    tap({
      error: (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            router.navigate(['']);
          }
        }
      }
    })
  );
};
