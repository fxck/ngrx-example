import { Routes } from '@ngrx/router';

import { permGuard } from '../../services/Ng2Permission';

import { CatsRoute } from './cats.route/cats.route';

export const catsRoutes: Routes = [
  {
    path: '/cats',
    guards: [
      permGuard({
        only: ['user']
      }, '/login')
    ],
    component: CatsRoute
  }
];
