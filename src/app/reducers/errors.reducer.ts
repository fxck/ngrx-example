import { Action, Reducer } from '@ngrx/store';

export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

let initialState: Object = {};

export const errors: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, getErrorObj(action.payload));

    case RESET_ERROR:
      var newObj = Object.assign({}, state);
      delete newObj[action.payload];

      return newObj;

    default:
      return state;
  }
};


const getErrorObj = (payload) => {
  var r = {}; r[payload.key] = payload.errors;
  return r;
};