import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatSlideToggleModule, MatDialogModule, MatInputModule, MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialComponentsModule {
}
