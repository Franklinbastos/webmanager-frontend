import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { SidenavComponent } from './sidenav/sidenav';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { FixedFinancesSettingsComponent } from './finances/fixed-finances-settings/fixed-finances-settings.component';

registerLocaleData(localePt, 'pt-BR');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    SidenavComponent,
    GoalListComponent,
    FixedFinancesSettingsComponent,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};