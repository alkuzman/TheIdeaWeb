import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Sharable} from "../../domain/model/sharing/sharable";
import {Organization} from "../../domain/model/authentication/organization";
import {Idea} from "../../domain/model/ideas/idea";
import {Notice} from "../../domain/model/sharing/notice";
/**
 * Created by AKuzmanoski on 18/01/2017.
 */

@Injectable()
export class RedirectService {
  constructor(private router: Router) {
  }

  login(param: {email: string}) {
    this.router.navigate(['/auth'], {queryParams: param});
  }

  getAnnouncementDetails(id: number) {
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
    this.router.navigate(["/notices", "new"], {queryParams: {sharableId: sharable.id}});
  }

  getOrganizationDetails(organization: Organization) {

  }

  newTransaction(idea: Idea) {
    this.router.navigate(["/transactions", "new"], {queryParams: {ideaId: idea.id}});
  }

  getTransactionDetails(notice: Notice) {
    this.router.navigate(["/transactions", notice.id]);
  }

  initSecurityProfile() {
    this.router.navigate(["/security-profile/init"])
  }
}
