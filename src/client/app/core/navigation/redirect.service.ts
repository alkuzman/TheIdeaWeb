import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Sharable} from "../../domain/model/sharing/sharable";
import {Organization} from "../../domain/model/authentication/organization";
/**
 * Created by AKuzmanoski on 18/01/2017.
 */

@Injectable()
export class RedirectService {
  constructor(private router: Router) {}

  getAnnouncemntDetails(id: number) {
    this.router.navigate(['/announcements', id.toString()]);
  }

  getProblemDetails(id: number) {
    this.router.navigate(["/problems", id]);
  }

  getAnnouncements(param: {query: string}) {
    this.router.navigate(["/announcements", "feed"], {queryParams: param});
  }

  search(param: {query: string}) {
    this.router.navigate(["/search"], {queryParams: param});
  }

  getUserDetails(id: number) {
    this.router.navigate(["/users", id]);
  }

  getIdeaDetails(id: number) {
    this.router.navigate(["/ideas", id]);
  }

  newAnnouncement(sharable: Sharable) {
    this.router.navigate(["/announcements", "new"], {queryParams: {sharableId: sharable.id}});
  }

  sendTo(sharable: Sharable) {
    console.log("Send To");
  }

  getOrganizationDetails(organization: Organization) {

  }
}
