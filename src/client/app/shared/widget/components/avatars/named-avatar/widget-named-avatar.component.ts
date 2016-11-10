import {Input, Component} from "@angular/core";
import {Alignment} from "./enum-alignment";
import {AvatarType} from "./enum-avatar-type";
import {AbstractValueAccessor, MakeProvider} from "../../../../abstract-value-accessor";
/**
 * Created by Viki on 10/29/2016.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-widget-named-avatar",
  templateUrl: "widget-named-avatar.component.html",
  styleUrls: ["widget-named-avatar.component.css"],
  providers: [MakeProvider(WidgetNamedAvatarComponent)]
})
export class WidgetNamedAvatarComponent extends AbstractValueAccessor<string> {
  @Input("radius") radius: number = 50;
  @Input("alignment") alignment: Alignment = Alignment.center;
  @Input("name") name: string = "Guest";
  @Input("description") description: string = "";
  @Input("type") type: AvatarType = AvatarType.CHOOSER;
  chooserType: AvatarType = AvatarType.CHOOSER;
  displayType: AvatarType = AvatarType.DISPLAY;


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
