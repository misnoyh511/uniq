import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatSlideToggleModule, MatDialogModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule, MatFormFieldModule,
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
    MatSnackBarModule,
    MatSelectModule,
      MatFormFieldModule
  ]
})
export class MaterialComponentsModule {
}
