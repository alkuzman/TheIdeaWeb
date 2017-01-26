import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by Viki on 1/25/2017.
 */
@Pipe({
  name: "noticeSubmitLabel"
})
export class NoticeSubmitLabelPipe implements PipeTransform {
  transform(value: string, args: any): any {
    return value == null || value == "" ? "Send" : value;
  }

}
