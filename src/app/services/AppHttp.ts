import { Injectable } from 'angular2/core';
import {
  Http,
  HTTP_PROVIDERS,
  Headers,
  BaseRequestOptions,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  RequestMethod,
  Response
} from 'angular2/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppHttp {

  constructor(private _http: Http) {}

  _request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let request: any;

    if (typeof url === 'string') {
      let reqOpts = options || {};

     if (reqOpts.body && typeof reqOpts.body !== 'string') {
        reqOpts.body = JSON.stringify(reqOpts.body);

        reqOpts.headers = new Headers({
          'Content-Type': 'application/json'
        });
      }

      request = this._http.request(url, reqOpts);

    } else {
      let req: Request = <Request>url;

      req.headers = new Headers({
        'Content-Type': 'application/json'
      });

      request = this._http.request(req);
    }

    return request;
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ url:  url, method: RequestMethod.Get }, options);
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Post }, options);
  }

  public put(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Put }, options);
  }

  public delete(url: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ url:  url, method: RequestMethod.Delete }, options);
  }

  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.requestHelper({ url:  url, body: body, method: RequestMethod.Patch }, options);
  }

  private requestHelper(
    requestArgs: RequestOptionsArgs,
    additionalOptions: RequestOptionsArgs): Observable<Response> {

    let options = new RequestOptions(requestArgs);

    if (additionalOptions) {
      options = options.merge(additionalOptions);
    }

    return this._request(new Request(options))
      .catch(res => {
        if (res.status !== 500) {
          return Observable.of(res);
        }  else {
          alert('Oups');
        }
      });
  }
}
