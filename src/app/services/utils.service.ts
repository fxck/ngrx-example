import { Saga } from 'store-saga';

var flattenDeep = require('lodash/flattenDeep');
var uniq = require('lodash/uniq');

import { SET_ERROR } from '../reducers/errors.reducer';

export function recursiveReduce(
  source: Array<number>,
  entities: Object,
  by: string,
  entryLevel?: number): Array<any> {

  return source.reduce((arr, id) => {
    var ent = Object.assign({}, entities[id]);

    if (ent.level === entryLevel || !entryLevel) {
      if (ent[by] && ent[by].length) {
        ent[by] = recursiveReduce(ent[by], entities, by);
      }
      arr.push(ent);
    }

    return arr;

  }, []);

}

export const getSingleEntityObject = (
  name: string,
  id: number,
  payload: Object) => {

  var data = { entities: {} };
  data.entities[name] = {};
  data.entities[name][id] = payload;

  return data;
};

export const getUncachedEntities = (
  source: Array<any>,
  key: string,
  from: Object): Array<any> => {

  let ids = uniq(flattenDeep(source.map(res => res[key])));

  return ids.reduce((arr, id) => {
    if (!from[id]) {
      arr.push(id);
    }
    return arr;
  }, []);
};

export const getUrlWithIds = (
  url: string,
  ids?: Array<number>) => {

  var append = ids ? `?ids=${ids.join(',')}` : '';
  return `/${url + append}`;
};


export const shouldLoad = (entity: string, key: string): Saga<any> => {
  return saga$ => saga$.filter(saga$ => {
    return !saga$.state.entities[entity][saga$.action[key]];
  });
};

export function generateErrorPayload(payload, type: string) {
  var r = {
    type: SET_ERROR,
    payload: {
      errors: [],
      key: type
    }
  };

  if (payload.message) {
    r.payload.errors.push({
      text: payload.message,
      main: true
    });
  }

  if (payload.errors && payload.errors.length) {
    // temp fix until `errors` are guaranteed array
    if (typeof payload.errors === 'string') {
      r.payload.errors.push({
        text: payload.errors
      });
    } else {
      payload.errors.forEach(item => {
        r.payload.errors.push({
          text: item
        });
      });
    }


  }

  return r;
};

export function generateResponse(payload, successType: string, errorType: string, cb?) {
  var r = {};
  if (payload.status < 400 || !payload.status) {
    var asJson = payload.text() ? payload.json() : null;

    r = Object.assign({}, r, {
      type: successType,
      payload: cb ? cb.call(this, asJson) : null
    });

  } else {
    var payloadAsJson = payload.json();

    r = Object.assign({}, r, generateErrorPayload(payloadAsJson, errorType));
  }

  return r;
}
