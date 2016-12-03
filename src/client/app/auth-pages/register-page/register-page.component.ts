import {Component, OnInit, style, animate, state, transition, trigger, HostBinding} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FieldError} from "../../core/helper/field-error";
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
export class RegisterPageComponent implements OnInit {
  private email: string;

  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MdSnackBar) {
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

  constraintsViolated(fieldErrors: FieldError[]): void {
    let message: string = "";
    for (let fieldError of fieldErrors) {
      message += "[" + fieldError.field + "] " + fieldError.message + "\n";
    }
    message = message.substring(0, message.length - 1);
    let config = new MdSnackBarConfig();
    this.snackBar.open(message, 'Try Again', config);
  }
}
