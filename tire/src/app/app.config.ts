import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import {
  NbContextMenuModule,
  NbMenuModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes),
    importProvidersFrom(RouterModule.forRoot(routes, { useHash: true })),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'dark' })),
    importProvidersFrom(NbEvaIconsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    importProvidersFrom(NbPasswordAuthStrategy),
    importProvidersFrom(AuthGuard),
    importProvidersFrom(NbMenuModule.forRoot()),
    importProvidersFrom(NbContextMenuModule),
    importProvidersFrom(
      NbAuthModule.forRoot({
        strategies: [
          NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
              class: NbAuthJWTToken,
            },
            baseEndpoint: 'http://localhost:3000/api/v1/',
            login: {
              endpoint: 'auth/login',
              redirect: {
                success: 'home',
                failure: null,
              },
            },
          }),
        ],
        forms: {
          login: {
            rememberMe: false,
          },
        },
      }),
    ),
  ],
};
