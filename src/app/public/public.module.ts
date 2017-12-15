import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { PricingComponent } from './pricing/pricing.component';
import { IntergrationComponent } from './intergration/intergration.component';
import {CommonModule} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {PublicRoutes} from './public.routing';
import { HomeComponent } from './home/home.component';


@NgModule({
    imports: [
        RouterModule.forChild(PublicRoutes),
        CommonModule
    ],
    declarations: [FeaturesComponent, PricingComponent, IntergrationComponent, HeaderComponent, HomeComponent],
    exports: [HeaderComponent],
    entryComponents: [HeaderComponent]
})

export class PublicModule {}