import {Route} from '@angular/router';
import {FeaturesComponent} from './features/features.component';
import {IntergrationComponent} from './intergration/intergration.component';
import {PricingComponent} from './pricing/pricing.component';
import {HomeComponent} from './home/home.component';

export const PublicRoutes:  Route[] = [
    {
        path: 'how-it-works',
        component: FeaturesComponent
    },
    {
        path: 'about',
        component: IntergrationComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];

