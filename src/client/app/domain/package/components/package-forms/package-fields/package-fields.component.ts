/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
import {Package} from "../../../../model/sharing/package";
@Component({
  moduleId: module.id,
  selector: "ideal-package-fields",
  templateUrl: "package-fields.component.html",
  providers: [MakeProvider(PackageFieldsComponent)]
})
export class PackageFieldsComponent extends AbstractValueAccessor<Package> {

  constructor() {
    super(new Package());
  }
}
