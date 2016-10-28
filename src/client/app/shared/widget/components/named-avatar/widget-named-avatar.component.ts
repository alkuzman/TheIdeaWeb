import {Input, Component} from "@angular/core";
import {Alignment} from "./enum-alignment";
/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-widget-named-avatar",
  templateUrl: "widget-named-avatar.component.html",
  styleUrls: ["widget-named-avatar.component.css"],
})
export class WidgetNamedAvatarComponent {
  @Input("radius") radius: number = 50;
  @Input("src") src: string = "assets/images/default-user.png";
  @Input("alignment") alignment: Alignment = Alignment.center;
  @Input("name") name: string = "Guest";
  @Input("description") description: string = "";

  isLeft(): boolean {
    return this.alignment == Alignment.left;
  }

  isRight(): boolean {
    return this.alignment == Alignment.right;
  }

  isCenter(): boolean {
    return this.alignment == Alignment.center;
  }
}
