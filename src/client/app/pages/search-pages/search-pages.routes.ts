import {Routes} from "@angular/router";
import {SearchPageComponent} from "./search-page.component";
/**
 * Created by AKuzmanoski on 20/01/2017.
 */
export const SearchPagesRoutes: Routes = [
  {
    path: "",
    component: SearchPageComponent,
    data: {
      pageSize: 10
    }
  }
];
