import { PayloadAction as Action } from '../PayloadAction';
import * as _ from 'lodash';
import { baseFilter } from '../state-models';
import { IdentityActions } from './actions';
import { IdentityState } from './state';


export function identityReducers(state: IdentityState, action: Action<any>): IdentityState {

    let identityActions = new IdentityActions();
    switch (action.type) {
        case identityActions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loggedInUseer: action.payload
            };
        case identityActions.LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                loggedInUseer: null
            };
        case identityActions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                loggedInUseer: null
            };
        default:
            return state;
    }
}
