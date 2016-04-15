/*
 * Providers provided by Angular
 */
import { bootstrap } from 'angular2/platform/browser';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { DIRECTIVES, PIPES, PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS } from './platform/environment';

/*
* App Component
* our top level component that holds all of our components
*/
import { AppComponent, APP_PROVIDERS } from './app';

/*
* App routes
*/
import { APP_ROUTES_PROVIDER } from './app/routes/routes';

/*
* App reducers
*/
import { APP_REDUCERS_PROVIDER } from './app/reducers/reducers';

/*
* App global components / containers
*/
import { APP_COMPONENTS_PROVIDERS } from './app/components/components';
import { APP_CONTAINERS_PROVIDERS } from './app/containers/containers';

/*
* App global services
*/
import { APP_SERVICES } from './app/services/services';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    ...ENV_PROVIDERS,
    ...PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS,
    APP_ROUTES_PROVIDER,
    APP_REDUCERS_PROVIDER,
    APP_COMPONENTS_PROVIDERS,
    APP_CONTAINERS_PROVIDERS,
    APP_SERVICES
  ])
  .catch(err => console.error(err));

}

/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}
