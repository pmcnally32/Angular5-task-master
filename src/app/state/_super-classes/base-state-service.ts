import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { SortExpression, PagingInfo, RecordIdDto, ModelState } from "../state-models";
import * as _ from 'lodash';
import { BaseActions } from "./base-actions";
import 'rxjs/add/operator/map'

export class BaseStateService<STATE, INDTO extends RecordIdDto, OUTDTO extends RecordIdDto, FILTERDTO> {

  constructor(
    protected actionService: BaseActions<INDTO, OUTDTO, FILTERDTO>,
    protected store: Store<STATE>,
    protected modulePath: string) {
  }

  selectItems(): Observable<OUTDTO[]> {
    return this.store.select(s => eval(`s.${this.modulePath}.items`));
  }

  selectItem(id: number): Observable<INDTO> {
    return this.store
      .select(s => eval(`s.${this.modulePath}.items`))
      .map(items => _.find(items, i => i.id == id));
  }

  selectSortExpression(): Observable<SortExpression> {
    return this.store.select(s => eval(`s.${this.modulePath}.filter`)).map(f => ({
      sortField: f.sortFieldNames,
      assending: f.sortFieldDirections === 'desc' ? false : true
    }));
  }

  selectPendingItem(): Observable<INDTO> {
    return this.store
      .select(s => eval(`s.${this.modulePath}.pendingItem`));
  }
  selectIsSavedSuccess(): Observable<Boolean> {
    return this.store.select(s => eval(`s.${this.modulePath}.isSuccess`));
  }

  selectModelState(): Observable<ModelState> {
    return this.store.select(s => eval(`s.${this.modulePath}.modelState`));
  }

  selectPagingInfo(): Observable<PagingInfo> {
    return this.store.select(s => eval(`s.${this.modulePath}`)).map(p => ({
      pageSize: p.filter.objectsPerPage,
      pageIndex: p.filter.page,
      count: p.count
    }));
  }



  /************** Dispatchers ************** */
  dispatchLoad() {
    this.store.dispatch(this.actionService.createLoadAction());
  }

  dispatchFilter(filter: FILTERDTO) {
    this.store.dispatch(this.actionService.createFilterAction(filter));
  }

  dispatchAdd(item: INDTO) {
    this.store.dispatch(this.actionService.createAddItemAction(item));
  }

  dispatchSelectId(id: number) {
    this.store.dispatch(this.actionService.createSelectItemAction(id));
  }

  dispatchDelete(item: INDTO) {
    this.store.dispatch(this.actionService.createDeleteItemAction(item));
  }
  dispatchUpdate(item: INDTO) {
    this.store.dispatch(this.actionService.createUpdateItemAction(item));
  }
}