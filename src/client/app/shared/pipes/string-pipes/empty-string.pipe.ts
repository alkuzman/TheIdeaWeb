/**
 * Created by AKuzmanoski on 01/11/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: "idealEmptyString"
})
export class EmptyStringPipe implements PipeTransform {
  transform(value: string, args: any): any {
    if (value == null)
      return "";
    return value.trim();
  }

}
