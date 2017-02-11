import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by AKuzmanoski on 26/12/2016.
 */
@Pipe({
  name: "idealUserCoverPicture",
  pure: false
})
export class UserCoverPicturePipe implements PipeTransform {
  transform(coverPicture: string, args: any): any {
    return coverPicture || coverPicture == "" ? coverPicture : "/assets/images/default-user-cover.png";
  }

}
