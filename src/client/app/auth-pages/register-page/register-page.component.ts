import {Component, OnInit, style, animate, state, transition, trigger, HostBinding} from "@angular/core";
import {UserObjectService} from "../../core/user/user-object.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../core/model/authentication/user";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-register-page",
  templateUrl: "register-page.component.html",
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class RegisterPageComponent implements OnInit{
  private email: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params['email'];
    });
  }

  authenticate(): void {
    let queryParams = {};
    if (this.email != null)
      queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }

  login(user: User): void {
    if (this.email == null)
      this.email = user.email;
    let queryParams = {"email": this.email};
    this.router.navigate(["auth"], {queryParams: queryParams});
  }
}
