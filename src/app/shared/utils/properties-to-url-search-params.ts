import {Properties} from "./properties";
import {URLSearchParams} from "@angular/http";
/**
 * Created by AKuzmanoski on 30/11/2016.
 */
export class PropertiesToUrlSearchParams {
  static transform(properties: Properties, urlParams?: URLSearchParams): URLSearchParams {
    if (urlParams == null)
      urlParams = new URLSearchParams();
    for (let i in properties) {
      let property: string = properties[i];
      if (property != null)
        urlParams.append(i, property);
    }
    return urlParams;
  }
}
