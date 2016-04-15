import { provideRouter, Routes, createGuard } from '@ngrx/router';

import { FofRoute } from './fof.route/fof.route';

import { homeRoutes } from '../_home/routes/home.routes';
import { peopleRoutes } from '../_people/routes/people.routes';
import { authRoutes } from '../_auth/routes/auth.routes';
import { catsRoutes } from '../_cats/routes/cats.routes';

const routes: Routes = [
  ...homeRoutes,
  ...peopleRoutes,
  ...authRoutes,
  ...catsRoutes,
  {
    path: '/**',
    component: FofRoute
  }
];

export const APP_ROUTES_PROVIDER = provideRouter(routes);
