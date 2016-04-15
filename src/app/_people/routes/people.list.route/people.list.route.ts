import {
  Component,
  OnInit,
  OnDestroy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// action creators
import { list, add } from '../../services/people-actions.service';

// selectors
import { getList$ } from '../../services/people-selectors.service';

// components
import {
  PeopleListComponent
} from '../../components/people-list.component/people-list.component';

// components
import {
  PersonFormComponent
} from '../../components/person-form.component/person-form.component';

@Component({
  selector: 'people-list-route',
  directives: [
    PeopleListComponent,
    PersonFormComponent
  ],
  template: require('./people.list.route.html'),
  styles: [ require('./people.list.route.scss') ]
})
export class PeopleListRoute implements OnInit, OnDestroy {
  // data
  public people$: Observable<Array<any>> = this._store.let(getList$())

  // dom event streams
  public onInit$ = new Subject<any>();
  public onAdd$ = new Subject<any>();

  // actions
  public initAction$ = this.onInit$.map(list());
  public addAction$ = this.onAdd$.map(add());

  constructor(private _store: Store<any>) {}

  // subscription helpers
  private _subscription: Subscription;

  ngOnInit() {
    this._subscription = Observable
      .merge(
        this.initAction$,
        this.addAction$
      )
      .subscribe(this._store);

    this.onInit$.next(null);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
