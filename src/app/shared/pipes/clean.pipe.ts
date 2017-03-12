/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: "idealClean"
})
export class CleanPipe implements PipeTransform {
  transform(value: any, clean: boolean): any {
    if (clean)
      return "";
    return value;
  }

}
