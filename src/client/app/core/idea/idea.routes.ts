import {Route} from "@angular/router";
import {NewIdeaComponent} from "./component/new-idea/new-idea.component";
import {IdeaComponent} from "./component/idea/idea.component";
import {IdeasComponent} from "./component/ideas/ideas.component";


export const IdeaRoutes: Route[] = [
  {
    path: 'ideas/new',
    component: NewIdeaComponent
  }, {
    path: "ideas/:id",
    component: IdeaComponent
  }, {
    path: "ideas",
    component: IdeasComponent
  }
];
