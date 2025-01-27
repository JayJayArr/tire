import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbContextMenuModule,
  NbDatepickerModule,
  NbDateTimePickerComponent,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbTimepickerModule,
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(NbMenuModule.forRoot()),
    importProvidersFrom(RouterModule.forRoot(routes, { useHash: false })),
    importProvidersFrom(NbThemeModule.forRoot({ name: 'dark' })),
    importProvidersFrom(NbDatepickerModule.forRoot()),
    importProvidersFrom(NbTimepickerModule.forRoot()),
    importProvidersFrom(NbEvaIconsModule),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch(), withInterceptors([ApiInterceptor])),
    importProvidersFrom(AuthGuard),
    importProvidersFrom(NbContextMenuModule),
    importProvidersFrom(
      NbToastrModule.forRoot({ duplicatesBehaviour: 'all', limit: 3 }),
    ),
    importProvidersFrom(NbSidebarModule.forRoot()),
    importProvidersFrom(NbDialogModule.forRoot({ hasBackdrop: true })),
    { provide: NbRoleProvider, useClass: RoleProvider },
    importProvidersFrom(
      NbSecurityModule.forRoot({
        accessControl: {
          user: {
            view: ['/personal'],
          },
          admin: {
            view: ['/admin', '/readers'],
          },
          poweruser: {
            view: ['/overview', '/users'],
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
            resetPass: {
              endpoint: '/auth/reset-pass',
              redirect: {
                success: 'personal',
                failure: null,
              },
            },
            register: {
              endpoint: '/auth/sign-up',
              redirect: {
                success: 'personal',
                failure: null,
              },
            },
          }),
        ],
        forms: {
          register: { terms: false },
          login: {
            rememberMe: false,
          },
          validation: {
            password: {
              required: true,
              minLength: 5,
              maxLength: 72,
            },
            email: {
              required: true,
            },
            fullName: {
              required: false,
              minLength: 0,
              maxLength: 72,
            },
          },
        },
      }),
    ),
    provideAnimationsAsync(),
  ],
};
