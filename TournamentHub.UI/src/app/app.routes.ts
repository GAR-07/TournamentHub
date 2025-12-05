import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { environment } from '../environments/environment.dev';
import { API_URL } from './app-injection-tokens';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then(m => m.HomePage),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth-page/auth-page').then(m => m.AuthPage),
  },
  {
    path: 'tournaments',
    loadComponent: () =>
      import('./pages/tournaments-page/tournaments-page').then(m => m.TournamentsPage),
  },
    {
    path: 'cabinet',
    loadComponent: () =>
      import('./pages/cabinet-page/cabinet-page').then(m => m.CabinetPage),
  },
  {
    path: 'game/:guid',
    loadComponent: () =>
      import('./pages/game-page/game-page').then(m => m.GamePage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(m => m.NotFoundPage),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: API_URL,
    useValue: environment.apiUrl
  }],
})
export class AppRoutingModule { }

