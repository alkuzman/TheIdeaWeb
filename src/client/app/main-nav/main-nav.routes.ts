/**
 * Created by PC on 17/09/2016.
 */
import { Routes } from '@angular/router';
import { routes } from './main-nav.routes';

import { AboutRoutes } from '../about/index';
import { HomeRoutes } from '../home/index';

export const routes: Routes = [
    ...HomeRoutes,
    ...AboutRoutes
];
