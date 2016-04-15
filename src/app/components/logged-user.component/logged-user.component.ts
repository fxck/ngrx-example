import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { IAuth } from '../../_auth/interfaces/IAuth';

@Component({
  selector: 'logged-user-component',
  styles: [ require('./logged-user.component.scss') ],
  template: require('./logged-user.component.html')
})
export class LoggedUserComponent {
  @Input()
  public data: IAuth;

  @Output()
  public logout = new EventEmitter(false);
}
