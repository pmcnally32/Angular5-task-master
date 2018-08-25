import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../state";
import { UsersActions } from "./actions";
import { Observable } from "rxjs/Observable";
import { Action } from "rxjs/scheduler/Action";
import { UsersProxyService } from "./proxy-service";
import { ActionCreator } from "../_super-classes/action-creator";
import 'rxjs/add/operator/catch';
import { ToastrService } from "ngx-toastr";
import { PayloadAction } from "../PayloadAction";
import { UserDto } from "./models";

const emptyAction = { type: '[Users] empty', payload: { list: null, count: null } };

@Injectable()
export class UsersEffectsService {

    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private usersActions: UsersActions,
        private userProxyService: UsersProxyService,
        private notification: ToastrService
    ) {
    }
    @Effect()
    onLoadUsers(): Observable<ActionCreator<any>> {
        return this.actions$
            .ofType(this.usersActions.LOAD)
            .withLatestFrom(this.store)
            .switchMap(([, state]) => {
                //   if (!state.users.items) //if we want to cash the list, instead of calling the server again
                return this.userProxyService.getAll(
                    state.users.filter.page,
                    state.users.filter.objectsPerPage
                ).map(res => this.usersActions.createAddManyItemsAction(res))
                    .catch(err => Observable.of(this.usersActions.createOperationFailedAction(err.error)));

                //   return Observable.of(emptyAction);
            });
    }

    @Effect()
    onFilterUsers(): Observable<ActionCreator<any>> {
        return this.actions$
            .ofType(this.usersActions.FILTER)
            .withLatestFrom(this.store)
            .switchMap(([, state]) => {
                return this.userProxyService.getAll(
                    state.users.filter.page,
                    state.users.filter.objectsPerPage
                ).map(res => this.usersActions.createAddManyItemsAction(res))
                    .catch(err => Observable.of(this.usersActions.createOperationFailedAction(err.error)));
            });
    }


    @Effect()
    onAddItem(): Observable<ActionCreator<any>> {
        return this.actions$.ofType(this.usersActions.ADD)
            .switchMap(action => {
                let user = (action as PayloadAction<any>).payload;
                return this.userProxyService.add(user)
                    .map(res => this.usersActions.createAddSuccessAction(res))
                    .catch(err => Observable.of(this.usersActions.createOperationFailedAction(err.error)));
            });
    }


    @Effect()
    onUpdateItem(): Observable<ActionCreator<any>> {
        return this.actions$.ofType(this.usersActions.UPDATE)
            .switchMap(action => {
                let user = (action as PayloadAction<any>).payload;
                return this.userProxyService.update(user)
                    .map(res => this.usersActions.createUpdateSuccessAction(res))
                    .catch(err => Observable.of(this.usersActions.createOperationFailedAction(err.error)));
            });
    }


    @Effect()
    onDeleteItem(): Observable<ActionCreator<any>> {
        return this.actions$.ofType(this.usersActions.DELETE)
            .switchMap(action => {
                let itemtoDelete = (action as PayloadAction<any>).payload;
                return this.userProxyService.delete(itemtoDelete.recordId)
                    .map(res => this.usersActions.createDeleteSuccessAction(itemtoDelete))
                    .catch(err => Observable.of(this.usersActions.createOperationFailedAction(err.error)));
            });
    }

    @Effect()
    onCRUDSuccess(): Observable<ActionCreator<any>> {
        return this.actions$
            .filter(a => [this.usersActions.ADD_SUCCESS, this.usersActions.UPDATE_SUCCESS, this.usersActions.DELETE_SUCCESS].indexOf(a.type) > -1)
            .switchMap(action => {
                let user: UserDto = (action as PayloadAction<any>).payload;
                let actionName = action.type.split('_').length > 0 ? action.type.split('_')[0] : action.type;
                actionName = actionName.replace('[users]', '');
                this.notification.success(`Name: ${user.name ? user.name : user.first_name}`, `${actionName} Successfully`)
                return Observable.of(emptyAction)

            });
    }


    @Effect()
    onFailed() {
        return this.actions$
            .ofType(this.usersActions.FAILED)
            .switchMap(action => {
                let message = (action as PayloadAction<any>).payload.error;
                this.notification.error(message.error, 'Error')
                return Observable.of(emptyAction)
            });
    }

}
