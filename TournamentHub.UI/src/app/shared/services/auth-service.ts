import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_URL } from '../../app-injection-tokens';
import { tap } from 'rxjs';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../interceptors/token-interceptor';
import { LoginRequest } from '../models/auth/login-request.model';
import { RegisterRequest } from '../models/auth/register-request.model';
import { ChangePasswordRequest } from '../models/auth/сhange-password-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isAuthenticated = signal<boolean>(false);

  isAuthenticated = computed(() => this._isAuthenticated());

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    @Inject(API_URL) private apiUrl: string
  ) { 
    this._isAuthenticated.set(this.hasValidToken());
  }

  login(request : LoginRequest) {
    return this.http.post<any>(this.apiUrl + '/Auth/Login', request).pipe(
      tap(response => {
        accessTokenSetter(response.accessToken);
        this._isAuthenticated.set(true);
        this.router.navigate(['']);
      })
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<any>(this.apiUrl + '/Auth/Register', request).pipe(
      tap(response => {
        accessTokenSetter(response.accessToken);
        this._isAuthenticated.set(true);
        this.router.navigate(['']);
      })
    );
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this._isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  changePassword(request: ChangePasswordRequest) {
    return this.http.post<any>(this.apiUrl + '/Auth/ChangePassword', request);
  }

  getAccountData(): any | null {
    const token = accessTokenGetter();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  private hasValidToken(): boolean {
    const token = accessTokenGetter();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}

export function accessTokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function refreshTokenGetter() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function accessTokenSetter(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function refreshTokenSetter(token: string) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}