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
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
  NbAuthSimpleInterceptor,
  NbAuthJWTInterceptor,
} from '@nebular/auth';
import { AuthGuard } from './services/auth-guard.service';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(RouterModule.forRoot(routes, { useHash: false })),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'dark' })),
    importProvidersFrom(NbEvaIconsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch(), withInterceptors([ApiInterceptor])),
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
            baseEndpoint: environment.apiBaseUrl,
            login: {
              endpoint: '/auth/login',
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
