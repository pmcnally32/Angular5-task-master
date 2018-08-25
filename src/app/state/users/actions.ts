import { BaseActions } from "../_super-classes/base-actions";
import { Injectable } from "@angular/core";
import { UserDto, UserFilterDto } from "./models";



@Injectable()
export class UsersActions extends BaseActions<UserDto, UserDto, UserFilterDto> {

    constructor() {
        super("users")
    }
}

