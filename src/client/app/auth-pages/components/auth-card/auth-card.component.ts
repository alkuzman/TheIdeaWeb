import {Component, OnInit, trigger, state, style, transition, animate, HostBinding} from "@angular/core";
import {Alignment} from "../../../shared/widget/components/avatars/named-avatar/enum-alignment";
import {User} from "../../../domain/model/authentication/user";
/**
 * Created by Viki on 10/28/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-auth-card",
  templateUrl: "auth-card.component.html",
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('150ms 100ms ease-out')
      ]),
      transition(':leave', [
        animate('130ms ease-in', style({
          opacity: 0,
          transform: 'translateY(100%)',
        }))
      ])
    ])
  ]
})
export class AuthCardComponent implements OnInit {
  @HostBinding("@routeAnimation") routeAnimation() {
    return true;
  }

  namedAvatarAlignment: Alignment = Alignment.center;
  user: User;


  ngOnInit(): void {

  }
}
