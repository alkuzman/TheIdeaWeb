import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by AKuzmanoski on 25/02/2017.
 */
@Pipe({name: 'idealTitle', pure: false})
export class TitlePipe implements PipeTransform {
  transform(input: string, length: number): string {
    return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() )) : '';
  }
}
