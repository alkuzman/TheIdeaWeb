import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

/**
 * Created by AKuzmanoski on 26/02/2017.
 */
@Injectable()
export class IconRegistryService {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
  }

  public register(): void {
    this.iconRegistry.addSvgIcon(
      'light_bulb',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/light-bulb.svg')
    );
    this.iconRegistry.addSvgIcon(
      'problem_coverage_award',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/problem-coverage-award.svg')
    );
    this.iconRegistry.addSvgIcon(
      'innovativeness_award',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/innovativeness-award.svg')
    );
    this.iconRegistry.addSvgIcon(
      'snack_peak_award',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/snack-peak-award.svg')
    );
    this.iconRegistry.addSvgIcon(
      'award',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/award.svg')
    );
  }
}
