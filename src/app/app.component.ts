import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { SagaRunner } from 'store-saga';

// interfaces
import { IAuth } from './_auth/interfaces/IAuth';

// sagas
import { APP_SAGAS } from './sagas/sagas';

// services
import { Ng2Permission } from './services/Ng2Permission';

// action creators
import { checkAuth, logout } from './_auth/services/auth-actions.service';

// selectors
import { isAuthenticated$, getAuth$ } from './_auth/services/auth-selectors.service';

// components / containers
import { NotificationsContainer } from './containers/notifications.container/notifications.container';

// TODO: temp
import { START_NOTIFICATIONS } from './reducers/notifications.reducer';

@Component({
  selector: 'app',
  styles: [ require('./styles/app.scss') ],
  template: require('./app.component.html'),
  directives: [ NotificationsContainer ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  // data
  public isAuthenticated$: Observable<boolean> = this._store.let(isAuthenticated$());
  public userData$: Observable<IAuth> = this._store.let(getAuth$());

  // dom event streams
  public onLogout$ = new Subject<any>();
  public onInit$ = new Subject<any>();

  // actions
  public logoutAction$ = this.onLogout$.map(logout());
  public initAction$ = this.onInit$.map(checkAuth());

  // subscription helpers
  private _subscription: Subscription;

  constructor(
    public permission: Ng2Permission,
    private _runner: SagaRunner,
    private _store: Store<any>) {

    permission.define('user', () => {
      return _store.let(isAuthenticated$());
    });

    APP_SAGAS.forEach(saga$ => this._runner.run(saga$));

    // TODO: don't use dispatch, dispatch multiple actions on init
    _store.dispatch({
      type: START_NOTIFICATIONS
    });

  }

  ngOnInit() {
    this._subscription = Observable
      .merge(
        this.logoutAction$,
        this.initAction$
      )
      .subscribe(this._store);

    this.onInit$.next(null);
  }

}
