import { Observable } from "rxjs/Observable";
import { ModelState, SortExpression, baseFilter } from "../state-models";
import { LoggedInUserDetails } from "./identity.models";

export interface IdentityState {
    isLoggedIn: boolean,
    loggedInUseer?: LoggedInUserDetails,
};

export const IdentityInitialState: IdentityState = {
    isLoggedIn: false,
    loggedInUseer: null
};
