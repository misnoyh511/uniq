import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {GetStartedComponent} from './get-started.component';
import {GetStartedRoutes} from './get-started.routing';


@NgModule({
    imports: [
        RouterModule.forChild(GetStartedRoutes),
    ],
    declarations: [GetStartedComponent],
})

export class GetStarteddModule {}