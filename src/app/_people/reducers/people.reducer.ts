import { Action, Reducer } from '@ngrx/store';

import { IPeople } from '../interfaces/IPeople';
import { IPerson } from '../interfaces/IPerson';

import { RESET_STATE } from '../../constants/constants';

export const LOAD_PERSON_SUCCESS = 'LOAD_PERSON_SUCCESS';
export const LOAD_PERSON_REQUEST = 'LOAD_PERSON_REQUEST';
export const LOAD_PERSON_FAIL = 'LOAD_PERSON_FAIL';
export const LOAD_PEOPLE_REQUEST = 'LOAD_PEOPLE_REQUEST';
export const LOAD_PEOPLE_SUCCESS = 'LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_FAIL = 'LOAD_PEOPLE_FAIL';
export const PATCH_PERSON_REQUEST = 'PATCH_PERSON_REQUEST';
export const PATCH_PERSON_SUCCESS = 'PATCH_PERSON_SUCCESS';
export const PATCH_PERSON_FAIL = 'PATCH_PERSON_FAIL';
export const ADD_PERSON_REQUEST = 'ADD_PERSON_REQUEST';
export const ADD_PERSON_SUCCESS = 'ADD_PERSON_SUCCESS';
export const ADD_PERSON_FAIL = 'ADD_PERSON_FAIL';

let initialState: IPeople = {
  sort: 'id',
  result: [],
  loading: false
};

export const people: Reducer<any> = (state: IPeople = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PEOPLE_SUCCESS:
      return <IPeople>Object.assign({}, state, {
        result: action.payload.result
      });

    case ADD_PERSON_SUCCESS:
      return Object.assign({}, state, {
        result: [...state.result, action.payload.result]
      });

    case RESET_STATE:
      return <IPeople>Object.assign({}, initialState);

    default:
      return state;
  }
};
