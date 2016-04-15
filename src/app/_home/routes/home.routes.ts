import { Routes } from '@ngrx/router';

import { HomeRoute } from './home.route/home.route';

export const homeRoutes: Routes = [
  {
    path: '/',
    component: HomeRoute
  }
];
