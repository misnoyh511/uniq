import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { CommonModule } from '@angular/common';
import {SidebarComponent } from './sidebar/sidebar.component';
import {MaterialComponentsModule} from "../material-components.module";
import {FormsModule} from "@angular/forms";


declare var require: any;

@NgModule({
  imports: [RouterModule, CommonModule, ChartModule, MaterialComponentsModule, FormsModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent, ChartModule, CommonModule, MaterialComponentsModule, FormsModule],
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
