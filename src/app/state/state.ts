import { UsersState, UsersInitialState } from "./users/state";
import { IdentityState, IdentityInitialState } from "./identity/state";


export interface State {
    users: UsersState;
    identity: IdentityState;
}

export function getInitialState() {
    const strState = window.localStorage.getItem('$$Angular5-task-State$$');
    if (strState) {
        const state = JSON.parse(strState) as State;
        return state;
    }
    return {
        users: UsersInitialState,
        identity: IdentityInitialState

    };
};
