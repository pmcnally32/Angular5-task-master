import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { PayloadAction } from '../PayloadAction';
import { ActionCreatorFactory } from './action-creator';
import { ModelState } from '../state-models';

export abstract class BaseActions<INDTO, OUTDTO, FILTERDTO> {

    constructor(protected moduleName: string) {

    }
    //Basic Actions
    LOAD = `[${this.moduleName}] Load`;
    FILTER = `[${this.moduleName}] Filter`;
    ADD = `[${this.moduleName}] Add`;
    ADD_MANY = `[${this.moduleName}] Add_Many`;
    ADD_SUCCESS = `[${this.moduleName}] Add_Success`;
    SELECT_ITEM = `[${this.moduleName}] Select_Item`;
    FAILED = `[${this.moduleName}] Failed`;

    //CRUD Actions
    UPDATE = `[${this.moduleName}] Update`;
    UPDATE_SUCCESS = `[${this.moduleName}] Update_Success`;
    DELETE = `[${this.moduleName}] Delete`;
    DELETE_SUCCESS = `[${this.moduleName}] Delete_SUCCESS`;

    //Lookups Action
    LOADLOOKUPS = `[${this.moduleName}] LOAD_LOOKUPS`;

    //Basic Actions Creators
    createLoadAction = ActionCreatorFactory.create<void>(this.LOAD);
    createFilterAction = ActionCreatorFactory.create<FILTERDTO>(this.FILTER);
    createAddItemAction = ActionCreatorFactory.create<INDTO>(this.ADD);
    createAddManyItemsAction = ActionCreatorFactory.create<any>(this.ADD_MANY);
    createAddSuccessAction = ActionCreatorFactory.create<INDTO>(this.ADD_SUCCESS);

    createSelectItemAction = ActionCreatorFactory.create<any>(this.SELECT_ITEM);
    createOperationFailedAction = ActionCreatorFactory.create<ModelState>(this.FAILED);

    //CRUD Action Creator
    createUpdateItemAction = ActionCreatorFactory.create<INDTO>(this.UPDATE);
    createUpdateSuccessAction = ActionCreatorFactory.create<INDTO>(this.UPDATE_SUCCESS);
    createDeleteItemAction = ActionCreatorFactory.create<INDTO>(this.DELETE);
    createDeleteSuccessAction = ActionCreatorFactory.create<OUTDTO>(this.DELETE_SUCCESS);

    //Lookups Actions
    createLoadLookupsAction = ActionCreatorFactory.create(this.LOADLOOKUPS)

}