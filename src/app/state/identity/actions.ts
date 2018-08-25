import { BaseActions } from "../_super-classes/base-actions";
import { Injectable } from "@angular/core";
import { ActionCreatorFactory } from "../_super-classes/action-creator";
import { LoggedInUserDetails, Credentials } from "./identity.models";

@Injectable()
export class IdentityActions {

    LOGIN = '[identity] login';
    LOGIN_SUCCESS = '[identity] login success';
    LOGIN_FAILED = '[identity] login failed';
    LOGOUT = '[identity] logout';

    createLoginAction = ActionCreatorFactory.create<Credentials>(this.LOGIN);
    createLoginSuccessAction = ActionCreatorFactory.create<LoggedInUserDetails>(this.LOGIN_SUCCESS);
    createLoginFailedAction = ActionCreatorFactory.create<any>(this.LOGIN_FAILED);
    createLogoutAction = ActionCreatorFactory.create<void>(this.LOGOUT);

    constructor() {
    }
}

