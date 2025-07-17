import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { SidenavComponent } from './sidenav/sidenav';
import { GoalListComponent } from './goals/goal-list/goal-list.component';
import { FixedFinancesSettingsComponent } from './finances/fixed-finances-settings/fixed-finances-settings.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    SidenavComponent,
    GoalListComponent,
    FixedFinancesSettingsComponent
  ]
};