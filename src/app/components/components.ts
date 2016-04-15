import { provide, PLATFORM_DIRECTIVES } from 'angular2/core';

import { AppBarComponent } from './app-bar.component/app-bar.component';

const APP_COMPONENTS = [
  AppBarComponent
];

export const APP_COMPONENTS_PROVIDERS = provide(PLATFORM_DIRECTIVES, {
  useValue: [ ...APP_COMPONENTS ],
  multi: true
});