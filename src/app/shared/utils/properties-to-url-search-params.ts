import {Properties} from './properties';
import {HttpParams} from '@angular/common/http';

/**
 * Created by AKuzmanoski on 30/11/2016.
 */
export class PropertiesToUrlSearchParams {
  static transform(properties: Properties, urlParams?: HttpParams): HttpParams {
    if (urlParams == null) {
      urlParams = new HttpParams();
    }
    for (const i in properties) {
      const property: string = properties[i];
      if (property != null) {
        urlParams = urlParams.append(i, property);
      }
    }
    return urlParams;
  }
}
