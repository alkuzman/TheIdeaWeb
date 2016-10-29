import {Component, Input, EventEmitter, Output} from "@angular/core";
/**
 * Created by Viki on 10/29/2016.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-widget-labeled-input",
  templateUrl: "widget-labeled-input.component.html",
  styleUrls: ["widget-labeled-input.component.css"]
})
export class WidgetLabeledInput {
  @Input("label") label: string = "";
  @Input("description") description: string = "";
  @Input("inputName") name: string = "value";
  @Output("change") change: EventEmitter<string> = new EventEmitter<string>();
  value: string = "";

  onChange(): void {
    this.change.emit(this.value);
  }
}
