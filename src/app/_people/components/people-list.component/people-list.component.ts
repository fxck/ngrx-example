import {
  Component,
  Input,
  ChangeDetectionStrategy
} from 'angular2/core';

@Component({
  selector: 'people-list-component',
  host: {
    'class': 'people-list-component'
  },
  styles: [ require('./people-list.component.scss') ],
  template: require('./people-list.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent {
  @Input()
  public data;
}
