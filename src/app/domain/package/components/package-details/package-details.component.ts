/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component, Input} from '@angular/core';
import {Package} from '../../../model/sharing/package';

@Component({
  moduleId: module.id,
  selector: 'ideal-package-details',
  templateUrl: 'package-details.component.html'
})
export class PackageDetailsComponent {
  _package: Package;

  @Input('package')
  get package() {
    return this._package;
  }

  set package(pckg: Package) {
    this._package = pckg;
  }
}
