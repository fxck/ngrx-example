import { Action, Reducer } from '@ngrx/store';
// TODO: change to import when there are typings available
var merge = <any>require('lodash/merge');

import { IEntities } from '../interfaces/IEntities';

let initialState: IEntities = {
  people: {}
};

export const entities: Reducer<any> = (state: IEntities = initialState, action: Action) => {
  // picks any action with payload.entities on it
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
};
