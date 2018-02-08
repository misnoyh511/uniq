import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { CommonModule } from '@angular/common';
import {SidebarComponent } from './sidebar/sidebar.component';
import {MaterialComponentsModule} from "../material-components.module";


declare var require: any;

@NgModule({
  imports: [RouterModule, CommonModule, ChartModule, MaterialComponentsModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent,ChartModule, CommonModule, MaterialComponentsModule],
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
