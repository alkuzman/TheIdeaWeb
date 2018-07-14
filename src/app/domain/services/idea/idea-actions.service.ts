import {Injectable} from '@angular/core';
import {Actions} from '../../../core/helper/actions/actions';
import {Idea} from '../../model/ideas';
import {UserService} from '../user/user.service';
import {User} from '../../model/authentication';
import {Role} from '../../model/enumerations';

/**
 * Created by AKuzmanoski on 28/12/2016.
 */
@Injectable()
export class IdeaActionsService {
  private actions: Actions = {
    'mainActions': [
      {
        'title': 'Announce',
        'description': 'Announce that you have new idea. In this way everybody would have chance to see your idea',
        'icon': 'announcement',
        'color': 'primary',
        'scope': 'owner'
      },
      {
        'title': 'Send',
        'description': 'Send this idea to particular client',
        'icon': 'send',
        'color': 'primary',
        'scope': 'owner'
      },
      {
        'title': 'Buy',
        'description': 'Buy this idea',
        'icon': 'shop',
        'color': 'primary',
        'scope': 'notOwner'
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
        'description': 'Open details for this idea',
        'icon': 'more',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Problem',
        'description': 'See details for problem of this idea',
        'icon': 'help',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Owner',
        'description': 'See details for owner of this idea',
        'icon': 'person',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Share',
        'description': 'Share this idea with other media',
        'icon': 'share',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Report',
        'description': 'Report this idea for bad content',
        'icon': 'report_problem',
        'color': 'default',
        'scope': 'user'
      },
      {
        'title': 'Edit',
        'description': 'Edit this idea',
        'icon': 'edit',
        'color': 'default',
        'scope': 'owner'
      },
      {
        'title': 'Remove',
        'description': 'Remove this idea permanently',
        'icon': 'delete_forever',
        'color': 'warn',
        'scope': 'owner'
      },
      {
        'title': 'Ban',
        'description': 'Ban this idea for inappropriate content',
        'icon': 'block',
        'color': 'warn',
        'scope': 'administrator'
      }
    ]
  };

  private authenticatedUser: User;

  constructor(private userService: UserService) {
    this.authenticatedUser = this.userService.getAuthenticatedUser();
    this.userService.getAuthenticatedUserObservable().subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  public getActions(idea: Idea): Actions {
    return this.extractAllowedActions(this.actions, idea);
  }

  private extractAllowedActionsData(actions: Actions, idea: Idea): Actions {
    return this.extractAllowedActions(actions, idea);
  }

  private extractAllowedActions(actions: Actions, idea: Idea): Actions {
    const newActions: Actions = {
      mainActions: [],
      menuActions: []
    };
    for (const action of actions.mainActions) {
      if (action.scope === 'user') {
        newActions.mainActions.push(action);
      } else if (action.scope === 'notOwner' && (this.authenticatedUser == null ||
        this.authenticatedUser.id !== idea.owner.id)) {
        newActions.mainActions.push(action);
      } else if (this.authenticatedUser == null) {
        continue;
      }
      if (action.scope === 'owner' && (this.authenticatedUser.id === idea.owner.id)) {
        newActions.mainActions.push(action);
      } else if (action.scope === 'problemOwner' && (this.authenticatedUser.id === idea.problem.questioner.id)) {
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
      if (action.scope === 'owner' && (this.authenticatedUser.id === idea.owner.id)) {
        newActions.menuActions.push(action);
      } else if (action.scope === 'problemOwner' && (this.authenticatedUser.id === idea.problem.questioner.id)) {
        newActions.menuActions.push(action);
      } else if (action.scope === 'administrator' && this.authenticatedUser.role === Role.ADMINISTRATOR) {
        newActions.menuActions.push(action);
      }
    }
    return newActions;
  }
}
