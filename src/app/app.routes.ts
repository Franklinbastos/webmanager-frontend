import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { FinanceListComponent } from './finances/finance-list/finance-list';
import { authGuard } from './auth/auth-guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { title: 'Home' } },
      { path: 'finances', component: FinanceListComponent, data: { title: 'Finanças' } },
    ]
  },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', redirectTo: '/app' }
];