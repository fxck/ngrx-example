import { Action, Reducer } from '@ngrx/store';

import { INotifications } from '../interfaces/INotifications';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const STOP_NOTIFICATIONS = 'STOP_NOTIFICATIONS';
export const START_NOTIFICATIONS = 'START_NOTIFICATIONS';

let initialState: INotifications = {
  notifications: [],
  running: false
};

export const notifications: Reducer<any> = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return Object.assign({}, state, { notifications: [...state.notifications, action.payload] });

    case START_NOTIFICATIONS:
      return Object.assign({}, state, { running: true });

    case STOP_NOTIFICATIONS:
      return Object.assign({}, state, { running: false });

    default:
      return state;
  }
};