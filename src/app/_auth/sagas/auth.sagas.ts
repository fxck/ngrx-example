import { Response, Http } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import { Saga, createSaga, whenAction } from 'store-saga';
import { Action } from '@ngrx/store';
import { Router } from '@ngrx/router';

import { AppHttp } from '../../services/AppHttp';

import { IAuth } from '../interfaces/IAuth';

import { generateResponse } from '../../services/utils.service';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS
} from '../reducers/auth.reducer';

const login = createSaga((_http: AppHttp): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(LOGIN_REQUEST))
    .delay(1)
    // here would be your auth call in a mergeMap
    .mergeMap(
      saga$ => _http.post(
        'http://localhost:3100/login',
        JSON.stringify(saga$.action.payload)
      ),
      (saga$, payload) => generateResponse(
        payload,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        (res) => {
          localStorage.setItem('auth', JSON.stringify(res));

          return res;
        }
      )
    );
}, [ AppHttp ]);

const logout = createSaga((): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(LOG_OUT_REQUEST))
    .delay(1)
    .map(() => ({
      type: LOG_OUT_SUCCESS
    }));
});

const onLoginSuccess = createSaga((_router: Router): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(LOGIN_SUCCESS, LOG_OUT_SUCCESS))
    .delay(1)
    .do(() => _router.replace('/'))
    .filter(() => false);
}, [ Router ] );

export const authSagas = [
  login,
  logout,
  onLoginSuccess
];
