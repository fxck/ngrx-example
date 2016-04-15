import { Action, Reducer, Store } from '@ngrx/store';

import { IAuth } from '../interfaces/IAuth';

import { RESET_STATE } from '../../constants/constants';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_CHECKED = 'LOGIN_CHECKED';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

let initialState: IAuth = {
  name: null,
  avatar: null,
  isAuthenticated: false
};

export const auth: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGIN_CHECKED:
      return Object.assign({}, state, action.payload);

    case LOG_OUT_SUCCESS:
    case RESET_STATE:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};
