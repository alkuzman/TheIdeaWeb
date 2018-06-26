import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/authentication';
import {Alignment} from '../../../../../shared/widget/components/avatars/named-avatar/enum-alignment';
import {AuthenticationService} from '../../../../../core/authentication/authentication.service';
import {UserContext} from '../../../security-context/user-context';

/**
 * Created by AKuzmanoski on 01/11/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-authenticated-user-named-avatar',
  templateUrl: 'authenticated-user-named-avatar.component.html'
})
export class AuthenticatedUserNamedAvatarComponent implements OnInit {
  user: User;
  @Input('profilePictureRadius') profilePictureRadius = 50;
  @Input('alignment') alignment: Alignment = Alignment.left;
  @Input('nameFontSize') nameFontSize = '12pt';
  @Input('descriptionFontSize') descriptionFontSize = '12pt';

  constructor(private userContext: UserContext, private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
    if (!this.authenticationService.isAuthenticated()) {
      this.user = new User();
      this.user.firstName = 'Guest';
      this.user.name = 'Guest';
      this.user.email = 'guest@ideal-hub.com';
    } else {
      this.user = this.userContext.get();
    }
  }
}
