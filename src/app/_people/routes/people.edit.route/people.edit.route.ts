import {
  Component,
  OnInit,
  OnDestroy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';

// interfaces
import { IPerson } from '../../interfaces/IPerson';

// action creators
import { one, patch } from '../../services/people-actions.service';

// selectors
import { getOne$ } from '../../services/people-selectors.service';

// components
import {
  PersonFormComponent
} from '../../components/person-form.component/person-form.component';

@Component({
  selector: 'people-edit-route',
  directives: [ PersonFormComponent ],
  template: require('./people.edit.route.html')
})
export class PeopleEditRoute implements OnInit, OnDestroy {
  public person$: Observable<IPerson> = this._params.pluck('id')
    .mergeMap(id => this._store.let(getOne$(id)))

  // dom event streams
  public onPatch$ = new Subject<any>();

  // action streams
  public queryIdSetAction$ = this._params.pluck('id').map(one());
  public patchAction$ = this.onPatch$
    .mergeMap(
      id => this._params.pluck('id'),
      (data, id) => ({
        id: id,
        data: data
      })
    )
    .map(patch());

  // subscription helpers
  private _subscription: Subscription;

  constructor(
    private _store: Store<any>,
    private _params: RouteParams) {}

  ngOnInit() {
    this._subscription = Observable
      .merge(
        this.queryIdSetAction$,
        this.patchAction$
      )
      .subscribe(this._store);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
