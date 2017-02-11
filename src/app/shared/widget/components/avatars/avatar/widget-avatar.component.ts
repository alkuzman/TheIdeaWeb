import {Component, Input} from "@angular/core";
/**
 * Created by Viki on 10/28/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-widget-avatar",
  templateUrl: "widget-avatar.component.html",
  styleUrls: ["widget-avatar.component.scss"]
})
export class WidgetAvatarComponent {
  @Input("radius") radius: number = 50;
  @Input("src") src: string;
}
