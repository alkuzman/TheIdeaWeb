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
})

export class HomeComponent implements OnInit {
  @HostBinding("style.display") get display() {
    return "block";
  }

  categories: Module[];
  numOfColumns: number = 4;

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
    this.changeColumns(window.innerWidth);
  }

  onResize(event: any) {

    let width = event.target.innerWidth;
    this.changeColumns(width);
  }

  changeColumns(width: number) {
    if (width >= 992)
      this.numOfColumns = 4;
    if (width < 992)
      this.numOfColumns = 3;
    if (width < 768)
      this.numOfColumns = 2;
    if (width < 420)
      this.numOfColumns = 1;
  }
}
