import {ModuleImage} from "./module-image";
import {ModuleAction} from "./module-action";
/**
 * Created by AKuzmanoski on 20/12/2016.
 */
export interface Module {
  title: string;
  description: string;
  action?: ModuleAction;
  image: ModuleImage;
}
