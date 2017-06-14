import {Component, HostBinding, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
import {fadeIn, fadeOut} from "../../core/animations/fade-animations";
import {transition, trigger, useAnimation} from "@angular/animations";

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [
    trigger("pageAnimation", [
      transition(':enter',
        useAnimation(fadeIn), {params: {delay: "1000ms"}}),
      transition(':leave',
        useAnimation(fadeOut), {params: {duration: "1000ms"}})
    ])
  ]
})
export class AboutComponent implements OnInit {
  @HostBinding("@pageAnimation") animation: boolean = true;
  constructor(private themingService: ThemingService) {

  }

  @HostBinding("style.display") get display() {
    return "block";
  }

  ngOnInit() {
    this.themingService.currentTheme = "default-theme";
  }
}
