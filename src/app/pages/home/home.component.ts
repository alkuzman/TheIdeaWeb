import {Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
import {Module} from "./module/module";
import {ModuleService} from "./module/module.service";
import {pageAnimation} from "../../core/animations/standard-route-animations";

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ideal-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    pageAnimation("pageAnimation")
  ]
})

export class HomeComponent implements OnInit {
  @HostBinding("@pageAnimation") animation: boolean = true;

  @HostBinding("style.display") get display() {
    return "block";
  }

  categories: Module[];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param themingService
   * @param route
   */
  constructor(private themingService: ThemingService, private moduleService: ModuleService) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.moduleService.modules.subscribe((categories: Module[]) => {
      this.categories = categories;
    });
    this.themingService.currentTheme = "default-theme";
  }
}
