import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbContextMenuModule,
  NbMenuModule,
  NbSidebarModule,
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
    importProvidersFrom(RouterModule.forRoot(routes, { useHash: false })),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'dark' })),
    importProvidersFrom(NbEvaIconsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    importProvidersFrom(AuthGuard),
    importProvidersFrom(NbMenuModule.forRoot()),
    importProvidersFrom(NbContextMenuModule),
    importProvidersFrom(NbSidebarModule.forRoot()),
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
            logout: {
              endpoint: '',
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
