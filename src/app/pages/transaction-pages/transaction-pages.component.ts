import {Component, OnInit} from "@angular/core";
import {ThemingService} from "../../core/theming/theming.service";
/**
 * Created by Viki on 2/19/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-transaction-pages",
  templateUrl: "transaction-pages.component.html"
})
export class TransactionPagesComponent implements OnInit {

  constructor(private themingService: ThemingService) {
  }

  ngOnInit(): void {
    this.themingService.currentTheme = "transaction-theme";
  }

}
