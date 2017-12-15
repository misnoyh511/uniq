import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { IntergrationComponent } from './intergration/intergration.component';
import { HeaderComponent } from './header/header.component';
import {PublicRoutes} from './public.routing';


@NgModule({
    imports: [
        RouterModule.forChild(PublicRoutes),
    ],
    declarations: [FeaturesComponent, PricingComponent, IntergrationComponent, HeaderComponent],
    exports: [HeaderComponent],
    entryComponents: [HeaderComponent]
})

export class PublicModule {}