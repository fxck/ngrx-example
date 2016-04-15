import { Observable } from 'rxjs/Observable';

export interface ISelector<T,V> {
  (state: Observable<T>): Observable<V>
};
