
import {Directive, ElementRef, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {SidebarService} from '../shared/sidebar/sidebar.service';

declare var $: any;
declare var Calendar: any;
declare var moment: any;
@Directive({
    selector: '[appDatePicker]'
})
export class DatePickerDirective implements AfterViewInit {
    constructor(private elRef: ElementRef, private sbs: SidebarService) {
    }
    @Output() onDateChange = new EventEmitter();
    ngAfterViewInit(): void {
        const that = this;
        const cal = new Calendar({
          element: $(this.elRef.nativeElement),
          format: { input: 'MMM D, YYYY'},
          earliest_date: '2000-01-01',
          latest_date: moment(),
          start_date: JSON.parse(localStorage.getItem('DATE_OBJ')).start || this.sbs.dateObj.start || moment().subtract(29, 'days'),
          end_date: JSON.parse(localStorage.getItem('DATE_OBJ')).end || this.sbs.dateObj.end || moment(),
          that : that,
          presets: [{
              label: 'Last 7 Days',
              start: moment().subtract(7, 'days'),
              end: moment()
          }, {
              label: 'Last 30 Days',
              start: moment().subtract(29, 'days'),
              end: moment()
          }, {
              label: 'Last 60 Days',
              start: moment().subtract(59, 'days'),
              end: moment()
          }],
          callback: function (obj, start, end) {
              obj.onDateChange.emit({start : start, end : end});
          }
      });
    }
}
