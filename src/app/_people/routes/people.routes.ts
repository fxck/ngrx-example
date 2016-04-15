import { Routes } from '@ngrx/router';

import { PeopleRoute } from './people.route/people.route';
import { PeopleListRoute } from './people.list.route/people.list.route';
import { PeopleDetailRoute } from './people.detail.route/people.detail.route';
import { PeopleEditRoute } from './people.edit.route/people.edit.route';

export const peopleRoutes: Routes = [
  {
    path: '/people',
    component: PeopleRoute,
    indexRoute: {
      component: PeopleListRoute
    },
    children: [
      {
        path: ':id',
        component: PeopleDetailRoute
      },
      {
        path: ':id/edit',
        component: PeopleEditRoute
      }
    ]
  }
];
