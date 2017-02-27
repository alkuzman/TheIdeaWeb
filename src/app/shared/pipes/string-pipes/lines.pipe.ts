import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by AKuzmanoski on 25/02/2017.
 */
@Pipe({name: 'idealLines', pure: false})
export class LinesPipe implements PipeTransform {
  transform(text: string, chars: string = '\\s'): string[] {
    return text.replace(/\r\n/g, '\n').split('\n');
  }
}
