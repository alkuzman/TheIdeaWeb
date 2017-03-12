import {NavigationItem} from "./navigation-item";
/**
 * Created by AKuzmanoski on 26/02/2017.
 */
export interface NavigationItemGroup {
  name: string;
  divider: boolean;
  items: NavigationItem[];
}
