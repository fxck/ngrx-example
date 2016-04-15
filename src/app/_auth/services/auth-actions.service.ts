import { Action } from '@ngrx/store';

import {
  LOGIN_REQUEST,
  LOG_OUT_REQUEST,
  LOGIN_CHECKED
} from '../reducers/auth.reducer';

export const login = () => {
  return (data): Action => ({
    type: LOGIN_REQUEST,
    payload: data
  });
};

export const checkAuth = () => {
  return (): Action => {
    let token = localStorage.getItem('auth');

    if (token) {
      return {
        type: LOGIN_CHECKED,
        payload: JSON.parse(token)
      };
    } else {
      return {
        type: null
      };
    }
  };
};

export const logout = () => {
  return (event: MouseEvent): Action => {
    event.preventDefault();

    localStorage.removeItem('auth');

    return {
      type: LOG_OUT_REQUEST
    };
  };
};
