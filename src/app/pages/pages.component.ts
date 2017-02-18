/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {NavigationService} from "../core/navigation/navigation.service";
import {NavigationItem} from "../core/navigation/navigation-item";
import {LoadingState} from "../core/loading/loading-state";
import {LoadingService} from "../core/loading/loading.service";
import {ScrollService} from "../core/scrolling/scroll-service";
import {RedirectService} from "../core/navigation/redirect.service";
import {SocketService} from "../core/socket/socket.service";
import {Notice} from "../domain/model/sharing/notice";
import {NoticeService} from "../domain/services/notice/notice.service";
import {JwtSecurityContext} from "../core/authentication/jwt/jwt-security-context.service";
import {Subscription} from "rxjs";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  query: string = "";
  searchState: boolean = false;
  navigationItems: NavigationItem[];
  private loadingState: LoadingState; //Subject<LoadingState> = new BehaviorSubject(null);
  private numberOfNotifications: number = 0;
  private accessTokenSubscription: Subscription;
  private loadingStateSubscription: Subscription;
  private socketSubscription: Subscription;

  constructor(private navigationService: NavigationService, private loadingService: LoadingService, private scrollService: ScrollService, private redirectService: RedirectService, private socketService: SocketService, private securityContext: JwtSecurityContext, private noticeService: NoticeService) {
  }

  ngOnInit(): void {
    this.getNavigation();
    this.getLoadingUpdates();
    this.getNotifications();
  }

  getNavigation() {
    this.navigationService.navigationItems
      .subscribe(
        (navigationItems: NavigationItem[]) => {
          this.navigationItems = navigationItems;
        },
        (error: any) => console.log(error));
  }

  getLoadingUpdates() {
    this.loadingStateSubscription = this.loadingService.loadingStateChange.subscribe((loadingState: LoadingState) => {
      this.loadingState = loadingState;
    });
  }

  getNotifications() {
    this.noticeService.getNoticeCount().subscribe((numberOfNotifications: number) => {
      this.setNumberOfNotifications(numberOfNotifications);
    });
    this.socketSubscription = this.socketService.newMessage().subscribe((notice: Notice) => {
      this.numberOfNotifications++;
    });
    this.accessTokenSubscription = this.securityContext.accessTokenObservable().subscribe((token: string) => {
      if (!this.securityContext.isValid(token)) {
        this.setNumberOfNotifications(0);
        return;
      }
      this.noticeService.getNoticeCount().subscribe((numberOfNotifications: number) => {
        this.setNumberOfNotifications(numberOfNotifications);
      });
    });
  }

  setNumberOfNotifications(value: number) {
    this.numberOfNotifications = value;
  }

  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
    this.accessTokenSubscription.unsubscribe();
    this.loadingStateSubscription.unsubscribe();
  }

  search(): boolean {
    return false;
  }

  searchStateToggle(): void {
    this.searchState = !this.searchState;
  }

  openSearch() {
    this.searchState = true;
  }

  closeSearch() {
    this.searchState = false;
  }

  onScroll(): void {
    this.scrollService.onScroll();
  }

  onSearch(query: string) {
    this.redirectService.search({query: query});
  }
}
