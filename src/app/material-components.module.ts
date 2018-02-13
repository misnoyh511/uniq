import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatSlideToggleModule, MatDialogModule, MatInputModule, MatButtonModule, MatSnackBarModule
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
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class MaterialComponentsModule {
}
