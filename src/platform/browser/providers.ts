/*
 * These are globally available services in any component or any other service
 */
import { provide } from 'angular2/core';

// Angular 2
import { FORM_PROVIDERS } from 'angular2/common';

// Angular 2 Http
import { HTTP_PROVIDERS } from 'angular2/http';

// Angular 2 Material
// TODO(gdi2290): replace with @angular2-material/all
import { MATERIAL_PROVIDERS } from './angular2-material2';

// 3rd party providers
import { installSagaMiddleware } from 'store-saga';
import { loggerMiddleware } from 'ngrx-store-logger';


const THIRDPARTY_PROVIDERS = [
  installSagaMiddleware(),
  ...loggerMiddleware()
];

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...MATERIAL_PROVIDERS,
  ...THIRDPARTY_PROVIDERS
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
