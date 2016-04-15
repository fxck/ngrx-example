import { provide, PLATFORM_DIRECTIVES } from 'angular2/core';

import { ErrorContainer } from './error.container/error.container';

const APP_CONTAINERS = [
  ErrorContainer
];

export const APP_CONTAINERS_PROVIDERS = provide(PLATFORM_DIRECTIVES, {
  useValue: [ ...APP_CONTAINERS ],
  multi: true
});