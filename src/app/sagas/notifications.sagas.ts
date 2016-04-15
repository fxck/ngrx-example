import { Store } from '@ngrx/store';

import { Saga, createSaga, whenAction } from 'store-saga';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

import {
  ADD_NOTIFICATION,
  START_NOTIFICATIONS,
  STOP_NOTIFICATIONS
} from '../reducers/notifications.reducer';

const add = createSaga((_store: Store<any>) => {
  return saga$ => saga$
    .filter(whenAction(START_NOTIFICATIONS))
    .delay(1)
    .mergeMap(authData => Observable
      .webSocket(`ws://localhost:3200`)
      .retryWhen((res) => {
        return res.delay(5000);
      })
      .takeUntil(saga$.filter(whenAction(STOP_NOTIFICATIONS)))
    )
    .catch(res => {
      return Observable.of(false);
    })
    .filter((res) => {
      return !!res
    })
    .map(res => ({
      type: ADD_NOTIFICATION,
      payload: res
    }));
}, [ Store ]);

export const notificationsSagas = [
  add
];

