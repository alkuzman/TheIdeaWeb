/**
 * Created by AKuzmanoski on 11/10/2016.
 */

import {IdeaService} from "../../idea.service";
import {IdeasComponent} from "./ideas.component";

let expectedIdeas = [{id:1, title: "Title"},
  {id:2, title: "Title2"}];

let mockService = <IdeaService>{getIdeas: () => expectedIdeas};

it('should have ideas when IdeasComponent created', () => {
  let ideasComponent = new IdeasComponent(mockService);
  expect(ideasComponent.ideas.length).toEqual(expectedIdeas.length);
});
