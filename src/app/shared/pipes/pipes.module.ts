/**
 * Created by AKuzmanoski on 01/11/2016.
 */
import {NgModule} from "@angular/core";
import {EmptyStringPipe} from "./string-pipes/empty-string.pipe";
import {AvatarDefaultPicturePipe} from "./avatar-pipes/avatar-default-picture.pipe";
import {TitlePipe} from "./string-pipes/title.pipe";
import {LinesPipe} from "./string-pipes/lines.pipe";
import {CleanPipe} from "./clean.pipe";
@NgModule({
  declarations: [EmptyStringPipe, AvatarDefaultPicturePipe, TitlePipe, LinesPipe, CleanPipe],
  exports: [EmptyStringPipe, AvatarDefaultPicturePipe, TitlePipe, LinesPipe, CleanPipe]
})
export class PipesModule {

}
