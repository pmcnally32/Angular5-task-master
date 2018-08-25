import { Observable } from "rxjs/Observable";
import { ModelState, SortExpression, baseFilter } from "../state-models";
import { UserDto, UserFilterDto } from "./models";

export interface UsersState {
    items: UserDto[],
    pendingItem?: UserDto,
    count: number,
    filter: UserFilterDto;
    selectedId?: number;
    modelState?: ModelState;
    isSuccess: boolean;
};

export const UsersInitialState: UsersState = {
    items: null,
    count: 12,
    filter: {
        ...(new baseFilter)
    },
    isSuccess: false
};
