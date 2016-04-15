import { ISelector } from '../../interfaces/ISelector';
import { IState } from '../../interfaces/IState';
import { IAuth } from '../interfaces/IAuth';

export const getAuth$ = (): ISelector<IState, IAuth>  => {
  return state$ => state$
    .map((res: IState) => res.auth)
    .distinctUntilChanged();
};

export const isAuthenticated$ = (): ISelector<IState, boolean> => {
  return state$ => state$
    .let(getAuth$())
    .map((res: IAuth) => res.isAuthenticated);
};
