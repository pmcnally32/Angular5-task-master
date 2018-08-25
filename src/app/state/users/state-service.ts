
import { Store } from '@ngrx/store';
import { BaseStateService } from '../_super-classes/base-state-service';
import { Injectable } from '@angular/core';
import { State } from '../state';
import { UsersActions } from './actions';
import { UserDto, UserFilterDto } from './models';


@Injectable()
export class UsersStateService extends BaseStateService<State, UserDto, UserDto, UserFilterDto> {

    constructor(
        protected store: Store<State>,
        protected actionService: UsersActions) {
        super(actionService, store, "users")
    }
}
