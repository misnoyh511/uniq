import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarComponent } from './sidebar/sidebar.component';
import {MaterialComponentsModule} from '../material-components.module';
import '../../assets/js/colorpicker.js';
import {DatePickerDirective} from '../date-picker.directive';
import {ColorPickerDirective} from '../color-picker.directive';


declare var require: any;

@NgModule({
  imports: [RouterModule, CommonModule, ChartModule, MaterialComponentsModule, FormsModule],
  declarations: [SidebarComponent, DatePickerDirective, ColorPickerDirective],
  exports: [SidebarComponent, ChartModule, CommonModule, MaterialComponentsModule, FormsModule,
      DatePickerDirective, ColorPickerDirective],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
})

export class SharedModule {
}

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}
