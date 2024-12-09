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
import { NbToastrService } from '@nebular/theme';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    public accessChecker: NbAccessChecker,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.accessChecker.isGranted('view', state.url).pipe(
      tap((granted) => {
        if (!granted) {
          this.toastrService.warning(
            'Sorry, this requires elevated rights',
            'Oops!',
          );
          this.router.navigate(['auth/login/']);
        }
      }),
    );
  }
}
