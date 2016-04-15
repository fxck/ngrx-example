import { IEntities } from './IEntities';
import { INotifications } from './INotifications';
import { IAuth } from '../_auth/interfaces/IAuth';
import { IPeople } from '../_people/interfaces/IPeople';

export interface IState {
  auth: IAuth,
  people: IPeople,
  entities: IEntities,
  notifications: INotifications
};
