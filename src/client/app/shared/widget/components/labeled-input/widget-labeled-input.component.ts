import {Component, Input} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../abstract-value-accessor";
/**
 * Created by Viki on 10/29/2016.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-widget-labeled-input",
  templateUrl: "widget-labeled-input.component.html",
  styleUrls: ["widget-labeled-input.component.css"],
  providers: [MakeProvider(WidgetLabeledInput)]
})
export class WidgetLabeledInput extends AbstractValueAccessor<string> {
  @Input("label") label: string = "";
  @Input("description") description: string = "";
  @Input("inputName") name: string = "value";
}
