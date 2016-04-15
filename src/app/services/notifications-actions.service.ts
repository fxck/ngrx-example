import { Action } from '@ngrx/store';

import {
  START_NOTIFICATIONS,
  STOP_NOTIFICATIONS
} from '../reducers/notifications.reducer';

export const start = () => {
  return (data): Action => ({
    type: START_NOTIFICATIONS
  });
};

export const stop = () => {
  return (data): Action => ({
    type: STOP_NOTIFICATIONS
  });
};
