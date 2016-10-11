/**
 * Created by PC on 17/09/2016.
 */
import {Routes} from "@angular/router";
import {AboutRoutes} from "../about/index";
import {HomeRoutes} from "../home/index";
import {IdeaRoutes} from "../idea/idea.routes";

export const MainRoutes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...IdeaRoutes
];
