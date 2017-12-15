import {Route} from '@angular/router';
import {FeaturesComponent} from './features/features.component';
import {IntergrationComponent} from './intergration/intergration.component';
import {PricingComponent} from './pricing/pricing.component';

export const PublicRoutes:  Route[] = [
    {
        path: 'about',
        component: FeaturesComponent
    },
    {
        path: 'integration',
        component: IntergrationComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    }
];

