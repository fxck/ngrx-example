import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { LogoComponent } from '../logo.component/logo.component';
import { LoggedUserComponent } from '../logged-user.component/logged-user.component';

@Component({
  selector: 'app-bar-component',
  directives: [
    LogoComponent,
    LoggedUserComponent
  ],
  styles: [ require('./app-bar.component.scss') ],
  template: require('./app-bar.component.html'),
  encapsulation: ViewEncapsulation.None
})
export class AppBarComponent {
  @Input()
  public isAuthenticated: boolean;

  @Input()
  public userData;

  @Output()
  public logout = new EventEmitter(false);
}
