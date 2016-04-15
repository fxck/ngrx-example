import {
  Component,
  OnInit,
  OnDestroy
} from 'angular2/core';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RouteParams } from '@ngrx/router';
import { Store } from '@ngrx/store';

// interfaces
import { IPerson } from '../../interfaces/IPerson';

// action creators
import { one } from '../../services/people-actions.service';

// selectors
import { getOne$ } from '../../services/people-selectors.service';

// components
import { PersonDetailComponent } from '../../components/person-detail.component/person-detail.component';

@Component({
  selector: 'people-detail-route',
  directives: [ PersonDetailComponent ],
  template: require('./people.detail.route.html')
})
export class PeopleDetailRoute implements OnInit, OnDestroy {
  public person$: Observable<IPerson> = this._params.pluck('id')
    .mergeMap(id => this._store.let(getOne$(id)))

  // action streams
  public queryIdSetAction$ = this._params.pluck('id').map(one());

  // subscription helpers
  private _subscription: Subscription;

  constructor(
    private _store: Store<any>,
    private _params: RouteParams) {}

  ngOnInit() {
    this._subscription = Observable
      .merge(
        this.queryIdSetAction$
      )
      .subscribe(this._store);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
