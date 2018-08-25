import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { PayloadAction } from '../PayloadAction';

export class ActionCreator<T> implements PayloadAction<any> {
    constructor(
        public type: string = 'NOT_SET',
        public payload?: T
    ) { }
}

@Injectable()
export class ActionCreatorFactory {
    static create?<T>(type: string, defaultPayloadValue?: T) {
        return (payload?: T): ActionCreator<T | any> => {
            const _payload = payload || typeof payload !== 'undefined' ? payload : defaultPayloadValue;
            return new ActionCreator<T>(type, _payload);
        };
    }

    create?<T>(type: string, defaultPayloadValue?: T) {
        return ActionCreatorFactory.create<T>(type, defaultPayloadValue);
    }
}