
import { Store } from '@ngrx/store';
import { BaseStateService } from '../_super-classes/base-state-service';
import { Injectable } from '@angular/core';
import { State } from '../state';
import { IdentityActions } from './actions';
import { Observable } from 'rxjs/Observable';
import { LoggedInUserDetails, Credentials } from './identity.models';



@Injectable()
export class IdentityStateService  {

    constructor(
        protected store: Store<State>,
        protected actionService: IdentityActions) {
    }

    dispatchLogin(logedInUser:Credentials) {
        this.store.dispatch(this.actionService.createLoginAction(logedInUser));
    }

    dispatchLogout() {
        this.store.dispatch(this.actionService.createLogoutAction());
    }


    selectLoginStatus(): Observable<boolean> {
        return this.store.select(s => s.identity.isLoggedIn);
    }
    selectLoginUser(): Observable<LoggedInUserDetails> {
        return this.store.select(s => s.identity.loggedInUseer);
    }

}
