// https://github.com/fxck/ng2-permission/

import {
  Injectable
} from 'angular2/core';

import { createGuard, Router } from '@ngrx/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Ng2Permission {
  private _store: Object = {};

  constructor() {}

  public define(name: string, validation) {
    this._store[name] = validation;
  }

  public authorize(authObj) {
    if (authObj.only && authObj.except) {
      throw new Error('Authorization object cannot contain both [only] and [except]');
    }

    if (authObj.only) {
      return this._checkAuthorization(authObj.only, 'only');
    }

    if (authObj.except) {
      return this._checkAuthorization(authObj.except, 'except');
    }

  }

  private _checkAuthorization(names, type) {
    var mergeObsrArr: Array<Observable<boolean>> = [];

    names.forEach((res) => {
      if (this._store[res]) {
        mergeObsrArr.push(this._store[res].call());

      } else {
        console.warn(`NgPermission: No defined validation for ${res}`);
      }
    });

    return Observable
      .combineLatest(...mergeObsrArr)
      .map((res: Array<boolean>) => {
        var r = res.some(x => x === true);
        if (type === 'only') {
          return !!r;
        }
        if (type === 'except') {
          return !r;
        }
      });

  }
}

export const permGuard = (perm, redirect) => {
  return createGuard((_permission: Ng2Permission, _router: Router) => {
    return () => _permission.authorize(perm).take(1).map(res => {
      if (res) {
        return true;
      } else {
        _router.replace(redirect);
        return false;
      }
    }).delay(1);

  }, [ Ng2Permission, Router ])
};