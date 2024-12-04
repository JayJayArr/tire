import { Injectable } from '@angular/core';

import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { map, Observable } from 'rxjs';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor(private authService: NbAuthService) {}

  getRole(): Observable<string> {
    return this.authService.onTokenChange().pipe(
      map((token: NbAuthToken) => {
        console.log(token.getPayload()['roles']);
        return token.isValid() ? token.getPayload()['roles'] : [];
      }),
    );
  }
}
