/**
 * Created by AKuzmanoski on 08/03/2017.
 */
import {Injectable} from '@angular/core';
import {Badge} from '../model/awards/badges/badge';

@Injectable()
export class BadgeIconResolverService {
  private icons: { [key: string]: string; } = {
    'Excellent Problem Coverage': 'problem_coverage_award',
    'Good Problem Coverage': 'problem_coverage_award',
    'Fair Problem Coverage': 'problem_coverage_award',
    'Poor Problem Coverage': 'problem_coverage_award',
    'Excellent Snack Peak Quality': 'snack_peak_award',
    'Good Snack Peak Quality': 'snack_peak_award',
    'Poor Snack Peak Quality': 'snack_peak_award',
    'Excellent Innovativeness': 'innovativeness_award',
    'Good Innovativeness': 'innovativeness_award',
    'Poor Innovativeness': 'innovativeness_award',
  };

  public resolveIcon(badge: Badge<any, any>): string {
    return this.icons[badge.name];
  }
}
