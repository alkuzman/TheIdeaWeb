import {Component, OnInit, OnDestroy, ViewEncapsulation, HostBinding} from "@angular/core";
import {
  trigger, state, style, transition, animate, query, group, useAnimation,
  animateChild
} from "@angular/animations";
import {ThemingService} from "../../core/theming/theming.service";
import {LoadingService} from "../../core/loading/loading.service";
import {LoadingState} from "../../core/loading/loading-state";
import {slideFromLeft, slideFromRight, slideToLeft, slideToRight} from "../../core/animations/slide-animations";
import {routerAnimations} from "../../core/animations/standard-route-animations";
/**
 * Created by Viki on 10/28/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-auth-pages",
  templateUrl: "auth-pages.component.html",
  styleUrls: ["auth-pages.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routerAnimations', [
      transition('auth => login',
        group([
          query('ideal-auth-page', group([
            useAnimation(slideToLeft),
            animateChild()
          ])),
          query('ideal-login-page', group([
            useAnimation(slideFromRight),
            animateChild()
          ]))
        ])
      ),
      transition('auth => register', [
        group([
          query('ideal-register-page', group([
            useAnimation(slideFromRight),
            animateChild()
          ]), { optional: true }),
          query('ideal-auth-page', group([
            useAnimation(slideToLeft),
            animateChild()
          ]), { optional: true })
        ])
      ]),
      transition('login => auth', [
        group([
          query('ideal-login-page', group([
            useAnimation(slideToRight),
            animateChild()
          ]), { optional: true }),
          query('ideal-auth-page', group([
            useAnimation(slideFromLeft),
            animateChild()
          ]), { optional: true })
        ])
      ]),
      transition('register => auth', [
        group([
          query('ideal-register-page', group([
            useAnimation(slideToRight),
            animateChild()
          ]), { optional: true }),
          query('ideal-auth-page', group([
            useAnimation(slideFromLeft),
            animateChild()
          ]), { optional: true })
        ])
      ]),
      transition('void => auth', [
        group([
          query('ideal-auth-page', group([
            useAnimation(slideFromRight, {params: {delay: "150ms"}}),
            animateChild()
          ]), { optional: true })
        ])
      ]),
      transition('void => login', [
        group([
          query('ideal-login-page', group([
            useAnimation(slideFromRight, {params: {delay: "150ms"}}),
            animateChild()
          ]), { optional: true })
        ])
      ]),
      transition('void => register', [
        group([
          query('ideal-register-page', group([
            useAnimation(slideFromRight, {params: {delay: "150ms"}}),
            animateChild()
          ]), { optional: true })
        ])
      ])
    ]),
    routerAnimations("routeAnimation")
  ]
})
export class AuthPagesComponent implements OnInit, OnDestroy {
  @HostBinding("@routeAnimation") animation: boolean = true;

  cardState = "active";
  loadingState: LoadingState;

  constructor(private themingService: ThemingService, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.loadingStateChange.subscribe((loadingState: LoadingState) => this.loadingState = loadingState);
    this.cardState = "active";
    this.themingService.currentTheme = "default-theme";
  }

  ngOnDestroy(): void {
  }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
