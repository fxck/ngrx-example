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
import { login } from '../../services/auth-actions.service';

// components
import {
  LoginFormComponent
} from '../../components/login-form.component/login-form.component';

@Component({
  selector: 'auth-route',
  directives: [ LoginFormComponent ],
  template: require('./auth.route.html')
})
export class AuthRoute implements OnInit, OnDestroy {
  // dom event streams
  public onLogin$ = new Subject<any>();

  // actions
  public loginAction$ = this.onLogin$.map(login());

  // subscription helpers
  private _subscription: Subscription;

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this._subscription = Observable
      .merge(this.loginAction$)
      .subscribe(this._store);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
