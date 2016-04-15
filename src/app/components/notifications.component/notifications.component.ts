import {
  Component,
  Input,
  ChangeDetectionStrategy
} from 'angular2/core';

@Component({
  selector: 'notifications-component',
  host: {
    'class': 'notifications-component'
  },
  styles: [ require('./notifications.component.scss') ],
  template: require('./notifications.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  @Input()
  public data;
}
