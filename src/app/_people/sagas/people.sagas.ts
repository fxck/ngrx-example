import { Response } from 'angular2/http';

import { Observable } from 'rxjs/Observable';
import { Saga, createSaga, whenAction } from 'store-saga';
import { normalize, arrayOf, Schema } from 'normalizr';
import { Router } from '@ngrx/router';

import { AppHttp } from '../../services/AppHttp';

import { IPeople } from '../interfaces/IPeople';
import { IPerson } from '../interfaces/IPerson';

import {
  getUrlWithIds,
  shouldLoad,
  generateResponse
} from '../../services/utils.service';

import {
  LOAD_PEOPLE_REQUEST,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_FAIL,
  LOAD_PERSON_REQUEST,
  LOAD_PERSON_SUCCESS,
  LOAD_PERSON_FAIL,
  PATCH_PERSON_REQUEST,
  PATCH_PERSON_SUCCESS,
  PATCH_PERSON_FAIL,
  ADD_PERSON_REQUEST,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_FAIL
} from '../reducers/people.reducer';

export const peopleSchema = new Schema('people');

const list = createSaga((_appHttp: AppHttp): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(LOAD_PEOPLE_REQUEST))
    .mergeMap(
      saga$ => _appHttp
        .get('http://localhost:3100'+ getUrlWithIds('people', saga$.action.payload)),
      (saga$, payload) => generateResponse(
        payload,
        LOAD_PEOPLE_SUCCESS,
        LOAD_PEOPLE_FAIL,
        (res) => normalize(res, arrayOf(peopleSchema))
      )
    );
}, [ AppHttp ]);

const one = createSaga((_appHttp: AppHttp): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(LOAD_PERSON_REQUEST))
    .let(shouldLoad('people', 'payload'))
    .mergeMap(
      saga$ => _appHttp
        .get(`http://localhost:3100/people/${saga$.action.payload}`),
      (saga$, payload) => generateResponse(
        payload,
        LOAD_PERSON_SUCCESS,
        LOAD_PERSON_FAIL,
        (res) => normalize(res, peopleSchema)
      )
    );
}, [ AppHttp ]);

const patch = createSaga((_appHttp: AppHttp): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(PATCH_PERSON_REQUEST))
    .mergeMap(
      saga$ => _appHttp
        .patch(
          `http://localhost:3100/people/${saga$.action.payload.id}`,
          JSON.stringify(saga$.action.payload.data)
        ),
      (saga$, payload) => generateResponse(
        payload,
        PATCH_PERSON_SUCCESS,
        PATCH_PERSON_FAIL,
        (res) => normalize(res, peopleSchema)
      )
    );
}, [ AppHttp ]);

const add = createSaga((_appHttp: AppHttp): Saga<any> => {
  return saga$ => saga$
    .filter(whenAction(ADD_PERSON_REQUEST))
    .mergeMap(
      saga$ => _appHttp
        .post(
          `http://localhost:3100/people`,
          JSON.stringify(saga$.action.payload)
        ),
      (saga$, payload) => generateResponse(
        payload,
        ADD_PERSON_SUCCESS,
        ADD_PERSON_FAIL,
        (res) => normalize(res, peopleSchema)
      )
    );
}, [ AppHttp ]);

export const peopleSagas = [
  one,
  list,
  patch,
  add
];
