/**
 * Created by AKuzmanoski on 01/11/2016.
 */
import {NgModule} from "@angular/core";
import {EmptyStringPipe} from "./string-pipes/empty-string.pipe";
import {AvatarDefaultPicturePipe} from "./avatar-pipes/avatar-default-picture.pipe";
@NgModule({
  declarations: [EmptyStringPipe, AvatarDefaultPicturePipe],
  exports: [EmptyStringPipe, AvatarDefaultPicturePipe]
})
export class PipesModule {

}
