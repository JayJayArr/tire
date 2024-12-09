import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbContextMenuModule,
  NbDatepickerModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
} from '@nebular/auth';
import { AuthGuard } from './services/auth-guard.service';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './api.interceptor';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './services/role.provider';

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
    importProvidersFrom(NbToastrModule.forRoot()),
    importProvidersFrom(NbSidebarModule.forRoot()),
    importProvidersFrom(NbDatepickerModule.forRoot()),
    { provide: NbRoleProvider, useClass: RoleProvider },
    importProvidersFrom(
      NbSecurityModule.forRoot({
        accessControl: {
          user: {
            view: ['/personal'],
          },
          admin: {
            view: ['/admin'],
          },
          poweruser: {
            view: ['/overview'],
          },
        },
      }),
    ),
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
                success: 'personal',
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
