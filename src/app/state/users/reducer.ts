import { UsersState } from './state';
import { UsersActions } from './actions';
import { PayloadAction } from '../PayloadAction';
import * as _ from 'lodash';
import { baseFilter } from '../state-models';


export function usersReducers(state: UsersState, action: PayloadAction<any>): UsersState {

    let usersActions = new UsersActions();
    switch (action.type) {
        case usersActions.ADD:
            return {
                ...state,
                pendingItem: action.payload,
                modelState: null,
                isSuccess: false
            };
        case usersActions.ADD_SUCCESS:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ],
                pendingItem: null,
                modelState: null,
                isSuccess: true
            };
        case usersActions.ADD_MANY:
            return {
                ...state,
                items: action.payload.data,
                count: action.payload.total,
                modelState: null,
                isSuccess: false
            };
        case usersActions.FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload
                },
                modelState: null,
                isSuccess: false
            };
        case usersActions.SELECT_ITEM:
            return {
                ...state,
                selectedId: action.payload,
                modelState: null,
                isSuccess: false
            };
        case usersActions.UPDATE:
            return {
                ...state,
                pendingItem: action.payload,
                modelState: null,
                isSuccess: false
            };
        case usersActions.UPDATE_SUCCESS:
            {
                _.remove(state.items, i => i.id == action.payload.id);
                return {
                    ...state,
                    items: [
                        ...state.items,
                        action.payload
                    ],
                    pendingItem: null,
                    modelState: null,
                    isSuccess: true
                };
            }
        case usersActions.FAILED:
            return {
                ...state,
                pendingItem: null,
                modelState: action.payload,
                isSuccess: false
            };
        case usersActions.LOAD:
            return {
                ...state,
                modelState: null,
                isSuccess: false,
                filter: { ...(new baseFilter) }
            };
        case usersActions.DELETE:
            return {
                ...state,
                modelState: null,
                isSuccess: false
            };
        case usersActions.DELETE_SUCCESS:
            {
                _.remove(state.items, i => i.id == action.payload.id);
                return {
                    ...state,
                    items: [
                        ...state.items
                    ],
                    pendingItem: null,
                    modelState: null,
                    isSuccess: true
                };
            }
        default:
            return state;
    }
}
