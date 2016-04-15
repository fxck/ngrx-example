import { ISelector } from '../interfaces/ISelector';
import { IState } from '../interfaces/IState';
import { INotifications } from '../interfaces/INotifications';

var orderBy = <any>require('lodash/orderBy');

export const getAuth$ = (): ISelector<IState, INotifications>  => {
  return state$ => state$
    .map((res: IState) => res.notifications)
    .distinctUntilChanged();
};

export const list$ = (): ISelector<IState, Array<any>> => {
  return state$ => state$
    .let(getAuth$())
    .map((res: INotifications) => res.notifications.filter(itm => itm.type === 'CAT'))
    .map(res => {
      return orderBy(res, ['id'], ['desc']);
    })
};

export const isRunning$ = (): ISelector<IState, boolean> => {
  return state$ => state$
    .let(getAuth$())
    .map((res: INotifications) => res.running);
};
