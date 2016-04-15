import { provideStore } from '@ngrx/store';

import { people } from '../_people/reducers/people.reducer';
import { auth } from '../_auth/reducers/auth.reducer';
import { entities } from './entities.reducer';
import { errors } from './errors.reducer';
import { notifications } from './notifications.reducer';

export const APP_REDUCERS_PROVIDER = provideStore({
  auth,
  people,
  entities,
  errors,
  notifications
});