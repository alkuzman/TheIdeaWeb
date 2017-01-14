import {Component, trigger, state, style, transition, group, animate, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
/**
 * Created by Viki on 10/28/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-auth-pages",
  templateUrl: "auth-pages.component.html",
  styleUrls: ["auth-pages.component.css"],
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
export class AuthPagesComponent implements OnInit{
  cardState = "active";

  constructor(private themingService: ThemingService) {
  }

  ngOnInit() {
    this.cardState = "active";
    this.themingService.currentTheme = "default-theme";
  }

}
