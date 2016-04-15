import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

import { LOGIN_FAIL } from '../../reducers/auth.reducer';

@Component({
  selector: 'login-form-component',
  host: {
    'class': 'login-form-component'
  },
  template: require('./login-form.component.html')
})
export class LoginFormComponent {
  public errorKey: string = LOGIN_FAIL;

  @Input()
  public data = {
    username: 'admin',
    password: '123'
  };

  @Output()
  public login = new EventEmitter(false);

  public form: ControlGroup;

  constructor(private _fb: FormBuilder) {
    this.form = _fb.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }

}
