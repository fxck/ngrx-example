import { Component } from 'angular2/core';

@Component({
  selector: 'logo-component',
  host: {
    'class': 'logo-component'
  },
  styles: [ require('./logo.component.scss') ],
  template: require('./logo.component.html')
})
export class LogoComponent {}
