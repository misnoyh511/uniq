import { NgModule } from '@angular/core';
import {SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [RouterModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})

export class SharedModule {
}
