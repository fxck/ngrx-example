import {
  Component,
  ChangeDetectionStrategy,
  Input
} from 'angular2/core';

@Component({
  selector: 'error-printer-component',
  styles: [ require('./error-printer.component.scss') ],
  template: require('./error-printer.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPrinterComponent {
  @Input() data;
}
