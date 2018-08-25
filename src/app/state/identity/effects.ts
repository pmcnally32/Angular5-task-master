import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../state";
import { Observable } from "rxjs/Observable";
import { Action } from "rxjs/scheduler/Action";
import { ActionCreator } from "../_super-classes/action-creator";
import 'rxjs/add/operator/catch';
import { IdentityActions } from "./actions";
import { Router } from "@angular/router";
import { PayloadAction } from "../PayloadAction";
import { Credentials } from "./identity.models";
import { ToastrService } from "ngx-toastr";
import { UsersProxyService } from "../users/proxy-service";

const emptyAction = { type: '[Identity] empty', payload: { list: null, count: null } };

@Injectable()
export class IdentityEffectsService {

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private actions: IdentityActions,
        private usersProxyService: UsersProxyService,
        private router: Router,
        private notification: ToastrService
    ) {
    }

    @Effect()
    onLogin(): Observable<PayloadAction<any>> {
        return this.actions$
            .ofType(this.actions.LOGIN)
            .switchMap(action => {
                let credentials: Credentials = (action as PayloadAction<any>).payload;
                return this.usersProxyService.login(
                    credentials.email, credentials.password
                ).map(res => this.actions.createLoginSuccessAction(Object.assign({}, credentials, res))
                ).catch(error => Observable.of(this.actions.createLoginFailedAction(error)));
            });
    }
    @Effect()
    onLoginSuccess(): Observable<PayloadAction<any>> {
        return this.actions$
            .ofType(this.actions.LOGIN_SUCCESS)
            .switchMap(action => {
                this.notification.success('Welcome! to Angular5 Task')
                return Observable.of(emptyAction)
            });
    }

    @Effect()
    onLoginFailier(): Observable<PayloadAction<any>> {
        return this.actions$
            .ofType(this.actions.LOGIN_FAILED)
            .switchMap(action => {
                let message = (action as PayloadAction<any>).payload.error;
                this.notification.error(message.error, 'Error')
                return Observable.of(emptyAction)
            });
    }


    @Effect()
    onLogout(): Observable<ActionCreator<any>> {
        return this.actions$
            .ofType(this.actions.LOGOUT).map(x => { })
            .switchMap(() => {
                this.router.navigate(['/login'], { replaceUrl: true });
                return Observable.of(emptyAction);
            });
    }
}
