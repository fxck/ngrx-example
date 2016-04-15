import { Component } from 'angular2/core';

@Component({
  selector: 'cats-route',
  template: require('./cats.route.html'),
  styles: [ require('./cats.route.scss') ]
})
export class CatsRoute {
  constructor() {}
}
