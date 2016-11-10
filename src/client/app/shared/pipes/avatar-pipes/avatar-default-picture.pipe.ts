/**
 * Created by AKuzmanoski on 10/11/2016.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: "idealAvatarDefaultPicture",
})
export class AvatarDefaultPicturePipe implements PipeTransform {
  transform(profilePicture: string, args: any): any {
    return profilePicture && profilePicture != "" ? profilePicture : "/assets/images/default-user.png";
  }
}
