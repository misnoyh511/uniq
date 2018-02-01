import {Routes} from '@angular/router';
import {NewBotComponent} from './new-bot.component';
import {AuthGuard} from "../auth-guard/auth-guard.middleware";

export const NewBotRoutes: Routes = [
    {
        path: 'new-bot',
        component: NewBotComponent,
        canActivate: [AuthGuard]

    },
];
