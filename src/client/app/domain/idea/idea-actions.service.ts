import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Actions} from "../../core/helper/actions/actions";
import {Idea} from "../model/ideas/idea";
import {UserService} from "../user/user.service";
import {User} from "../model/authentication/user";
import {Role} from "../model/enumerations/role";
/**
 * Created by AKuzmanoski on 28/12/2016.
 */
@Injectable()
export class IdeaActionsService {
  private actions: Actions;
  private authenticatedUser: User;

  constructor(private http: Http, private userService: UserService) {
    this.authenticatedUser = this.userService.getAuthenticatedUser();
  }

  public getActions(idea: Idea): Observable<Actions> {
    if (this.actions == null)
      return this.http.get("/assets/data/idea/idea.actions.json").map((response: Response) => this.extractAllowedActionsData(response, idea));
    else return Observable.of(this.extractAllowedActions(this.actions, idea));
  }

  private extractAllowedActionsData(res: Response, idea: Idea): Actions {
    let body: Actions = res.json();
    return this.extractAllowedActions(body, idea);
  }

  private extractAllowedActions(actions: Actions, idea: Idea): Actions {
    let newActions: Actions = {
      mainActions: [],
      menuActions: []
    };
    for (let action of actions.mainActions) {
      if (action.scope == "user")
        newActions.mainActions.push(action);
      else if (this.authenticatedUser == null)
        continue;
      else if (action.scope == "owner" && (this.authenticatedUser.id == idea.owner.id))
        newActions.mainActions.push(action);
      else if (action.scope == "problemOwner" && (this.authenticatedUser.id == idea.problem.questioner.id))
        newActions.mainActions.push(action);
      else if (action.scope == "administrator" && this.authenticatedUser.role == Role.ADMINISTRATOR)
        newActions.mainActions.push(action);
    }

    for (let action of actions.menuActions) {
      if (action.scope == "user")
        newActions.menuActions.push(action);
      else if (this.authenticatedUser == null)
        continue;
      else if (action.scope == "owner" && (this.authenticatedUser.id == idea.owner.id))
        newActions.menuActions.push(action);
      else if (action.scope == "problemOwner" && (this.authenticatedUser.id == idea.problem.questioner.id))
        newActions.menuActions.push(action);
      else if (action.scope == "administrator" && this.authenticatedUser.role == Role.ADMINISTRATOR)
        newActions.menuActions.push(action);
    }
    return newActions;
  }
}
