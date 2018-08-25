import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state';
import { RootActions } from './actions';

@Injectable()
export class RootStateService {

    constructor(private store: Store<State>) {
    }

    dispatchLoad() {
        this.store.dispatch(RootActions.createInitAppAction());
    }
}
