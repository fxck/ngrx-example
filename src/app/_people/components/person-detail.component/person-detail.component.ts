import {
  Component,
  Input,
  ChangeDetectionStrategy
} from 'angular2/core';

@Component({
  selector: 'person-detail-component',
  host: {
    'class': 'person-detail-component'
  },
  styles: [ require('./person-detail.component.scss') ],
  template: require('./person-detail.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailComponent {
  @Input()
  public data;
}
