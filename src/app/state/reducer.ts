import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { State } from "./state";
import { usersReducers } from "./users/reducer";
import { InjectionToken } from '@angular/core';
import { identityReducers } from './identity/reducer';

export function getReducers(): ActionReducerMap<State> {
  return {
    users: usersReducers,
    identity: identityReducers
  };
}
