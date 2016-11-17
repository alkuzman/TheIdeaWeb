import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {JwtHttpService} from "./jwt-http.service";
/**
 * Created by Viki on 11/17/2016.
 */


@NgModule({
  imports: [HttpModule],
  providers: [JwtHttpService]
})
export class HttpWraperModule {
}
