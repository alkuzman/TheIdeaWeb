import {Injectable} from '@angular/core';
import {Actions} from '../../../core/helper/actions/actions';
import {UserService} from '../user/user.service';
import {User} from '../../model/authentication';
import {Role} from '../../model/enumerations';
import {Problem} from '../../model/ideas';

/**
 * Created by AKuzmanoski on 28/12/2016.
 */
@Injectable()
export class ProblemActionsService {
  private actions: Actions = {
    'mainActions': [
      {
        'title': 'Announce',
        'description': 'Announce that you have new problem. In this way everybody would have chance to see your problem',
        'icon': 'announcement',
        'color': 'accent',
        'scope': 'owner'
      },
      {
        'title': 'Send',
        'description': 'Send this problem to particular user',
        'icon': 'send',
        'color': 'accent',
        'scope': 'owner'
      },
      {
        'title': 'Upvote',
        'description': 'This idea shows research effort, it is useful, and might be interesting',
        'icon': 'thumb_up',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Downvote',
        'description': 'This idea does not show enough research effort, it is unclear or not useful',
        'icon': 'thumb_down',
        'color': 'default',
        'scope': 'user'
      }
    ],
    'menuActions': [
      {
        'title': 'Details',
        'description': 'Open details for this problem',
        'icon': 'details',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Questioner',
        'description': 'See details for questioner of this problem',
        'icon': 'person',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Share',
        'description': 'Share this problem with other media',
        'icon': 'share',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Report',
        'description': 'Report this problem for bad content',
        'icon': 'report_problem',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Edit',
        'description': 'Edit this problem',
        'icon': 'edit',
        'color': 'default',
        'scope': 'owner'
      },
      {
        'title': 'Remove',
        'description': 'Remove this problem permanently',
        'icon': 'delete_forever',
        'color': 'warn',
        'scope': 'owner'
      },
      {
        'title': 'Ban',
        'description': 'Ban this problem for inappropriate content',
        'icon': 'block',
        'color': 'warn',
        'scope': 'administrator'
      }
    ]
  };

  private authenticatedUser: User;

  constructor(private userService: UserService) {
    this.authenticatedUser = this.userService.getAuthenticatedUser();
  }

  public getActions(problem: Problem): Actions {
    return this.extractAllowedActions(this.actions, problem);
  }

  private extractAllowedActionsData(actions: Actions, problem: Problem): Actions {
    return this.extractAllowedActions(actions, problem);
  }

  private extractAllowedActions(actions: Actions, problem: Problem): Actions {
    const newActions: Actions = {
      mainActions: [],
      menuActions: []
    };
    for (const action of actions.mainActions) {
      if (action.scope === 'user') {
        newActions.mainActions.push(action);
      } else if (this.authenticatedUser == null) {
        continue;
      }
      if (action.scope === 'owner' && (this.authenticatedUser.id === problem.questioner.id)) {
        newActions.mainActions.push(action);
      } else if (action.scope === 'administrator' && this.authenticatedUser.role === Role.ADMINISTRATOR) {
        newActions.mainActions.push(action);
      }
    }

    for (const action of actions.menuActions) {
      if (action.scope === 'user') {
        newActions.menuActions.push(action);
      } else if (this.authenticatedUser == null) {
        continue;
      }
      if (action.scope === 'owner' && (this.authenticatedUser.id === problem.questioner.id)) {
        newActions.menuActions.push(action);
      } else if (action.scope === 'administrator' && this.authenticatedUser.role === Role.ADMINISTRATOR) {
        newActions.menuActions.push(action);
      }
    }
    return newActions;
  }
}
