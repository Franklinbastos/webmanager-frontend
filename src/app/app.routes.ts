import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { FinanceListComponent } from './finances/finance-list/finance-list';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'finances',
    component: FinanceListComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/login' } // Rota wildcard para rotas não encontradas
];