import { ISelector } from '../../interfaces/ISelector';
import { IEntities } from '../../interfaces/IEntities';
import { IState } from '../../interfaces/IState';
import { IPeople } from '../interfaces/IPeople';
import { IPerson } from '../interfaces/IPerson';

import { recursiveReduce } from '../../services/utils.service';

export const getPeople$ = (): ISelector<IState, IPeople>  => {
  return state$ => state$
    .map((res: IState) => res.people)
    .distinctUntilChanged();
};

export const getEntities$ = (): ISelector<IState, Object>  => {
  return state$ => state$
    .map((res: IState) => res.entities)
    .map((res: IEntities) => res.people);
};

export const getList$ = (): ISelector<IState, Array<any>> => {
  return state$ => state$
    .let(getPeople$())
    .combineLatest(
      state$.let(getEntities$()),
      (people, entities) => {
        if (people.result && people.result.length) {
        return people.result
          .reduce((arr, id) => {
            arr.push(entities[id]);

            return arr;
          }, [])
          // TODO: recursive sort + move to utils
          .sort((a, b) => {
            if (a[people.sort] < b[people.sort]) {
              return -1;
            } else if (a[people.sort] > b[people.sort]) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          return [];
        }
      }
    )
};

export const getOne$ = (id): ISelector<IState, IPerson> => {
  return state$ => state$
    .let(getEntities$())
    .map(peopleEnt => {
      if (peopleEnt[id]) {
        return peopleEnt[id];
      }

      return {};
    });
};