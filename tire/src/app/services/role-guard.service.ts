import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    public accessChecker: NbAccessChecker,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    console.log(state.url);
    return this.accessChecker.isGranted('view', state.url).pipe(
      tap((granted) => {
        if (!granted) {
          this.router.navigate(['auth/login/']);
        }
      }),
    );
  }
}
