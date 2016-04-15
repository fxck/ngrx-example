// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/core';
import 'angular2/common';
import 'angular2/http';
import 'angular2/router';

// RxJS
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/add/observable/combineLatest';

// 3rd party
import '@ngrx/store';
import '@ngrx/router';
import 'ngrx-store-logger';
import 'store-saga';

// Angular Material2
import { MdButton, MdAnchor } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MdRadioGroup, MdRadioButton, MdRadioDispatcher } from '@angular2-material/radio';
import { MdSpinner, MdProgressCircle } from '@angular2-material/progress-circle';
import { MdToolbar } from '@angular2-material/toolbar';

if ('production' === ENV) {
  // Production


} else {
  // Development

}
