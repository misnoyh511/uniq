import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidebarComponent } from './sidebar/sidebar.component';
import {MaterialComponentsModule} from '../material-components.module';
import '../../assets/js/colorpicker.js';
import {DatePickerDirective} from '../directives/date-picker.directive';
import {ColorPickerDirective} from '../directives/color-picker.directive';
import {OutSideClickDirective} from '../directives/outsideclick.directive';
import { NouisliderModule} from 'ng2-nouislider';
import {ArraySortPipe} from '../directives/sort.directive';
import { TagCloudModule } from 'angular-tag-cloud-module';


declare var require: any;

@NgModule({
  imports: [RouterModule, CommonModule, ChartModule, MaterialComponentsModule, FormsModule, ReactiveFormsModule, NouisliderModule, TagCloudModule],
  declarations: [SidebarComponent, DatePickerDirective, ColorPickerDirective, ArraySortPipe, OutSideClickDirective],
  exports: [SidebarComponent, ChartModule, CommonModule, MaterialComponentsModule, FormsModule, ReactiveFormsModule,
      DatePickerDirective, ColorPickerDirective, NouisliderModule, ArraySortPipe, TagCloudModule, OutSideClickDirective],
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
