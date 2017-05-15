import {Route, Routes} from "@angular/router";
import {VerifyPageComponent} from "./components/verify-page.component";
import {VerificationResolverService} from "./verification-resolver.service";
/**
 * Created by Viki on 5/13/2017.
 */


export const VerifyPageRoutes: Routes = [
    {
        path: '',
        component: VerifyPageComponent,
        resolve: {
            user: VerificationResolverService
        }
    }
];