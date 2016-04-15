import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Store, Action } from '@ngrx/store';

// action creators
import { start, stop } from '../../services/notifications-actions.service';

// selectors
import { list$, isRunning$ } from '../../services/notifications-selectors.service';

// components
import { NotificationsComponent } from '../../components/notifications.component/notifications.component';

@Component({
  selector: 'notifications-container',
  host: {
    'class': 'notifications-container'
  },
  directives: [ NotificationsComponent ],
  template: require('./notifications.container.html'),
  styles: [ require('./notifications.container.scss') ]
})
export class NotificationsContainer {
  public notifications$: Observable<Array<any>>
    = this._store.let(list$());
  public isRunning$: Observable<boolean>
    = this._store.let(isRunning$());

  // dom event streams
  public onToggleStream$ = new Subject<any>();

  // actions
  public toggleStreamAction$ = this.onToggleStream$
    .mergeMap(
      isRunning => this._store.take(1).let(isRunning$()),
      (event, isRunning) => {
        if (isRunning) {
          return stop();
        } else {
          return start();
        }
      }
    )
    .map((res: any) => res());

  // subscription helpers
  private _subscription: Subscription;

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this._subscription = Observable
      .merge(this.toggleStreamAction$)
      .subscribe(this._store);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
