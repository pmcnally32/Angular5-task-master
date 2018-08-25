import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { IdentityStateService } from '../../../state/identity/state-service';

@Injectable()
export class AuthorizationGuardService implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private identityStateService: IdentityStateService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.identityStateService.selectLoginStatus().map(isLogedin => {
            if (isLogedin || (state.url.indexOf('login') > -1))
                return true;

            this.router.navigate(['login']);
            return isLogedin;
        });
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.identityStateService.selectLoginStatus().map(isLogedin => {
            if (isLogedin || (state.url.indexOf('login') > -1))
                return true;

            this.router.navigate(['login']);
            return isLogedin;
        });
    }
}
