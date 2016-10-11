import {Idea} from "./idea";
/**
 * Created by AKuzmanoski on 11/10/2016.
 */

export var IDEA = new Idea()
IDEA.id = 2;
IDEA.title = "Real idea";
IDEA.solution = "Real solution";
IDEA.problem = "Real problem";
export var IDEAS: Idea[] = [<Idea>{id: 1, problem: "Problem", solution: "Solution", title: "Title"}, <Idea>{id: 2, problem: "My problem", solution: "My solution", title: "My idea"}, IDEA];
