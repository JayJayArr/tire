import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  let authenticated;
  let authToken = '';
  let authService = inject(NbAuthService);
  authService.isAuthenticated().subscribe((result) => {
    authenticated = result;
  });

  if (authenticated) {
    authService.getToken().subscribe((token) => {
      if (token.isValid()) {
        authToken = token.getValue();
      }
    });
    const JWT = `Bearer ${authToken}`;
    const newreq = req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
    return next(newreq);
  }
  return next(req);
};
