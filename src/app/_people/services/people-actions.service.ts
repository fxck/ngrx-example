import { Schema } from 'normalizr';
import { Action } from '@ngrx/store';

import {
  LOAD_PEOPLE_REQUEST,
  LOAD_PERSON_REQUEST,
  PATCH_PERSON_REQUEST,
  ADD_PERSON_REQUEST
} from '../reducers/people.reducer';

export const list = () => {
  return (ids): Action => ({
    type: LOAD_PEOPLE_REQUEST,
    payload: ids
  });
};

export const one = () => {
  return id => ({
    type: LOAD_PERSON_REQUEST,
    payload: id
  });
};

export const patch = () => {
  return data => ({
    type: PATCH_PERSON_REQUEST,
    payload: data
  });
};

export const add = () => {
  return data => ({
    type: ADD_PERSON_REQUEST,
    payload: data
  });
};
