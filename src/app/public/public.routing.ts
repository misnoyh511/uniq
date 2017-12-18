import {Route} from '@angular/router';
import {FeaturesComponent} from './features/features.component';
import {IntergrationComponent} from './intergration/intergration.component';
import {PricingComponent} from './pricing/pricing.component';
import {HomeComponent} from './home/home.component';
import {CheckoutComponent} from './checkout/checkout.component';

export const PublicRoutes:  Route[] = [
    {
        path: 'features',
        component: FeaturesComponent
    },
    {
        path: 'integrations',
        component: IntergrationComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    }
];

