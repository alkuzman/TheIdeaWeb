/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {Injectable} from "@angular/core";
import {Badge} from "../model/awards/badges/badge";
@Injectable()
export class BadgeSiblingsService {
  public getDescendants(badge: Badge<any, any>) {
    let descendants: Badge<any, any>[] = [];
    let currentBadge: Badge<any, any>  = badge.next;
    while (currentBadge != null) {
      descendants.push(currentBadge);
      currentBadge = currentBadge.next;
    }
    return descendants;
  }
}
