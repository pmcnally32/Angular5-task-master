import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RootAppEffectsService } from './effects';
import { UsersEffectsService } from './users/effects';
import { UsersProxyService } from './users/proxy-service';
import { UsersStateService } from './users/state-service';
import { Store, StoreModule, INITIAL_STATE, _INITIAL_STATE } from '@ngrx/store';
import { State, getInitialState } from './state';
import { getReducers } from './reducer';
import { UsersActions } from './users/actions';
import { RootStateService } from './state-service';
import { IdentityStateService } from './identity/state-service';
import { IdentityActions } from './identity/actions';
import { IdentityEffectsService } from './identity/effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(getReducers(), { initialState: <any>getInitialState }),
    EffectsModule.forRoot([RootAppEffectsService, UsersEffectsService, IdentityEffectsService])
    
  ],
  declarations: [],
  providers: [RootStateService,
    UsersStateService, IdentityStateService, IdentityActions, UsersActions,
    UsersProxyService
  ]
})

export class StateModule {
  constructor(store: Store<State>) {
    store.subscribe(state => {
      window.localStorage.setItem('$$Angular5-task-State$$', JSON.stringify(state));
    });
  }
}
