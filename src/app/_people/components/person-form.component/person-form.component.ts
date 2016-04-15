import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from 'angular2/core';

import {
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

import { PATCH_PERSON_FAIL } from '../../reducers/people.reducer';

@Component({
  selector: 'person-form-component',
  host: {
    'class': 'person-form-component'
  },
  styles: [ require('./person-form.component.scss') ],
  template: require('./person-form.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent {
  public errorKey: string = PATCH_PERSON_FAIL;

  @Input()
  public data;

  public form: ControlGroup;

  @Output('onSubmit')
  private _submit = new EventEmitter(false);

  constructor(private _fb: FormBuilder) {
    this.form = _fb.group({
      name: [ '', Validators.required ],
      mail: [ '' ]
    });
  }

  public onSubmit(): boolean {

    if (this.form.valid) {
      this._submit.emit(this.form.value);
    }

    return false;
  }


}
