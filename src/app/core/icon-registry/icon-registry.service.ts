import {Injectable} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";
/**
 * Created by AKuzmanoski on 26/02/2017.
 */
@Injectable()
export class IconRegistryService {
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'light_bulb',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/light-bulb.svg')
    );
    iconRegistry.addSvgIcon(
      'problem_coverage_award',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/problem-coverage-award.svg')
    );
    iconRegistry.addSvgIcon(
      'innovativeness_award',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/innovativeness-award.svg')
    );
    iconRegistry.addSvgIcon(
      'snack_peak_award',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/snack-peak-award.svg')
    );
    iconRegistry.addSvgIcon(
      'award',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/award.svg')
    );
  }
}
