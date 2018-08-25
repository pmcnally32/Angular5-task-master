import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import { PayloadAction as Action } from './PayloadAction';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { State } from './state';
import { RootActions } from './actions';

const emptyAction = { type: '[RootEffects] Empty' };


@Injectable()
export class RootAppEffectsService {
    constructor(
        private actions$: Actions,
        private store: Store<State>
    ) {
    }

    @Effect()
    InitApp(): Observable<Action<any>> {
        return this.actions$
            .ofType(RootActions.INIT)
            .withLatestFrom(this.store)
            .switchMap(action => {
                return Observable.of(emptyAction);
            });
    }
    

}
