import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {GetStartedComponent} from './get-started.component';
import {GetStartedRoutes} from './get-started.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        RouterModule.forChild(GetStartedRoutes),
      SharedModule
    ],
    declarations: [GetStartedComponent],
})

export class GetStarteddModule {}
