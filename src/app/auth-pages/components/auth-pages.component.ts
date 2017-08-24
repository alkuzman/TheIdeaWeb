import {Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {animateChild, group, query, style, transition, trigger, useAnimation} from "@angular/animations";
import {ThemingService} from "../../core/theming/theming.service";
import {LoadingService} from "../../core/loading/loading.service";
import {LoadingState} from "../../core/loading/loading-state";
import {slideFromLeft, slideFromRight, slideToLeft, slideToRight} from "../../core/animations/slide-animations";
import {pageAnimation} from "../../core/animations/standard-route-animations";
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
          query(":leave, :enter",
            animateChild(), {optional: true}),
          query(':leave',
            useAnimation(slideToLeft), {optional: true}),
          query(':enter', [
            style({display: "block"}),
            useAnimation(slideFromRight)], {optional: true})
        ])

      ),
      transition('auth => register',
        group([
          query(":leave, :enter",
            animateChild(), {optional: true}),
          query(':enter',
            useAnimation(slideFromRight), {optional: true}),
          query(':leave',
            useAnimation(slideToLeft), {optional: true})
        ])
      ),
      transition('login => auth',
        group([
          query(":leave, :enter",
            animateChild(), {optional: true}),
          query(':leave',
            useAnimation(slideToRight), {optional: true}),
          query(':enter',
            useAnimation(slideFromLeft), {optional: true})
        ])
      ),
      transition('register => auth',
        group([
          query(":leave, :enter",
            animateChild(), {optional: true}),
          query(':leave',
            useAnimation(slideToRight), {optional: true}),
          query(':enter',
            useAnimation(slideFromLeft), {optional: true})
        ])
      ),
      transition('void => auth',
        query(':enter', group([
          useAnimation(slideFromRight, {params: {delay: "150ms"}}),
          animateChild()
        ]), {optional: true})
      ),
      transition('void => login',
        query(':enter', group([
          useAnimation(slideFromRight, {params: {delay: "150ms"}}),
          animateChild()
        ]), {optional: true})
      ),
      transition('void => register',
        query(':enter', group([
          useAnimation(slideFromRight, {params: {delay: "150ms"}}),
          animateChild()
        ]), {optional: true})
      )
    ]),
    pageAnimation("pageAnimation")
  ]
})
export class AuthPagesComponent implements OnInit, OnDestroy {
  @HostBinding("@pageAnimation") animation: boolean = true;

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

  public prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
