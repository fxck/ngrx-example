import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from 'angular2/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  ErrorPrinterComponent
} from '../../components/error-printer.component/error-printer.component';
import { RESET_ERROR } from '../../reducers/errors.reducer';

@Component({
  selector: 'error-container',
  directives: [ ErrorPrinterComponent ],
  template: require('./error.container.html')
})
export class ErrorContainer implements OnInit, OnDestroy {
  public errors$: Observable<any>

  @Input('key')
  private _key;

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this.errors$ = this._store
      .select<any>('errors')
      .map(res => res[this._key] || []);
  }

  ngOnDestroy() {
    this._store.dispatch({
      type: RESET_ERROR,
      payload: this._key
    });
  }
}