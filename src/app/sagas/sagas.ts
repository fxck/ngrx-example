import { authSagas } from '../_auth/sagas/auth.sagas';
import { peopleSagas } from '../_people/sagas/people.sagas';
import { notificationsSagas } from './notifications.sagas';

 export const APP_SAGAS = [
  ...authSagas,
  ...peopleSagas,
  ...notificationsSagas
];
