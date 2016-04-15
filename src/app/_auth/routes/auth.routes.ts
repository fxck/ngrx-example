import { Routes } from '@ngrx/router';

import { permGuard } from '../../services/Ng2Permission';

import { AuthRoute } from './auth.route/auth.route';

export const authRoutes: Routes = [
  {
    path: '/login',
    guards: [
      permGuard({
        except: ['user']
      }, '/')
    ],
    component: AuthRoute
  }
];
