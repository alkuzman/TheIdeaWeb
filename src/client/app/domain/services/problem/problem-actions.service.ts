import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Actions} from "../../../core/helper/actions/actions";
import {Idea} from "../../model/ideas/idea";
import {UserService} from "../user/user.service";
import {User} from "../../model/authentication/user";
import {Role} from "../../model/enumerations/role";
import {Problem} from "../../model/ideas/problem";
/**
 * Created by AKuzmanoski on 28/12/2016.
 */
@Injectable()
export class ProblemActionsService {
  private actions: Actions = {
    "mainActions": [
      {
        "title": "Announce",
        "description": "Announce that you have new problem. In this way everybody would have chance to see your problem",
        "icon": "announcement",
        "color": "accent",
        "scope": "owner"
      },
      {
        "title": "Send",
        "description": "Send this problem to particular user",
        "icon": "send",
        "color": "accent",
        "scope": "owner"
      }
    ],
    "menuActions": [
      {
        "title": "Details",
        "description": "Open details for this idea",
        "icon": "details",
        "color": "default",
        "scope": "user"
      },
      {
        "title": "Problem",
        "description": "See details for problem of this idea",
        "icon": "help",
        "color": "default",
        "scope": "user"
      },
      {
        "title": "Owner",
        "description": "See details for owner of this idea",
        "icon": "person",
        "color": "default",
        "scope": "user"
      },
      {
        "title": "Share",
        "description": "Share this idea with other media",
        "icon": "share",
        "color": "default",
        "scope": "user"
      },
      {
        "title": "Report",
        "description": "Report this idea for bad content",
        "icon": "report_problem",
        "color": "default",
        "scope": "user"
      },
      {
        "title": "Edit",
        "description": "Edit this idea",
        "icon": "edit",
        "color": "default",
        "scope": "owner"
      },
      {
        "title": "Remove",
        "description": "Remove this idea permanently",
        "icon": "delete_forever",
        "color": "warn",
        "scope": "owner"
      },
      {
        "title": "Ban",
        "description": "Ban this idea for inappropriate content",
        "icon": "block",
        "color": "warn",
        "scope": "administrator"
      }
    ]
  };

  private authenticatedUser: User;

  constructor(private http: Http, private userService: UserService) {
    this.authenticatedUser = this.userService.getAuthenticatedUser();
  }

  public getActions(problem: Problem): Actions {
    return this.extractAllowedActions(this.actions, problem);
  }

  private extractAllowedActionsData(res: Response, problem: Problem): Actions {
    let body: Actions = res.json();
    return this.extractAllowedActions(body, problem);
  }

  private extractAllowedActions(actions: Actions, problem: Problem): Actions {
    let newActions: Actions = {
      mainActions: [],
      menuActions: []
    };
    for (let action of actions.mainActions) {
      if (action.scope == "user")
        newActions.mainActions.push(action);
      else if (this.authenticatedUser == null)
        continue;
      else if (action.scope == "owner" && (this.authenticatedUser.id == problem.questioner.id))
        newActions.mainActions.push(action);
      else if (action.scope == "administrator" && this.authenticatedUser.role == Role.ADMINISTRATOR)
        newActions.mainActions.push(action);
    }

    for (let action of actions.menuActions) {
      if (action.scope == "user")
        newActions.menuActions.push(action);
      else if (this.authenticatedUser == null)
        continue;
      else if (action.scope == "owner" && (this.authenticatedUser.id == problem.questioner.id))
        newActions.menuActions.push(action);
      else if (action.scope == "administrator" && this.authenticatedUser.role == Role.ADMINISTRATOR)
        newActions.menuActions.push(action);
    }
    return newActions;
  }
}
