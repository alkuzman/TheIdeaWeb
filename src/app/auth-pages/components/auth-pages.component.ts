import {Component, trigger, state, style, transition, animate, OnInit, OnDestroy} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
import {LoadingService} from "../../core/loading/loading.service";
import {LoadingState} from "../../core/loading/loading-state";
/**
 * Created by Viki on 10/28/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-auth-pages",
  templateUrl: "auth-pages.component.html",
  styleUrls: ["auth-pages.component.scss"],
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
export class AuthPagesComponent implements OnInit, OnDestroy {
  cardState = "active";
  private loadingState: LoadingState;

  constructor(private themingService: ThemingService, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.loadingStateChange.subscribe((loadingState: LoadingState) => this.loadingState = loadingState);
    this.cardState = "active";
    this.themingService.currentTheme = "default-theme";
  }

  ngOnDestroy(): void {
  }
}
