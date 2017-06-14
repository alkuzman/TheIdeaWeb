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
import {NoticeService} from "../domain/services/notice/notice.service";
import {JwtSecurityContext} from "../core/authentication/jwt/jwt-security-context.service";
import {Subscription} from "rxjs";
import {NavigationItemGroup} from "../core/navigation/navigation-item-group";
import {MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Notice} from "../domain/model/sharing/notice";
import {transition, trigger, group, query, useAnimation, animateChild} from "@angular/animations";
import {fadeIn, fadeOut} from "../core/animations/fade-animations";
@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('feed => about',
        group([
          query(':leave',
            animateChild()),
          query(':enter',
            animateChild({delay: "150ms"}))
        ])
      ),
      transition('home => about',
        group([
          query(':leave',

            useAnimation(fadeOut, {params: {duration: "500ms"}})
          ),
          query(':enter',
            animateChild()
          )
        ])
      ),
      transition('about => home',
        group([
          query(':enter',
            useAnimation(fadeIn, {params: {delay: "1000ms"}})
          ),
          query(':leave',
            animateChild()
          )
        ])
      )
    ])
  ]
})
export class PagesComponent implements OnInit, OnDestroy {
  query: string = "";
  searchState: boolean = false;
  navigation: NavigationItemGroup[];
  loadingState: LoadingState; //Subject<LoadingState> = new BehaviorSubject(null);
  numberOfNotifications: number = 0;
  accessTokenSubscription: Subscription;
  loadingStateSubscription: Subscription;
  socketSubscription: Subscription;

  constructor(private navigationService: NavigationService, private loadingService: LoadingService, private scrollService: ScrollService, private redirectService: RedirectService, private socketService: SocketService, private securityContext: JwtSecurityContext, private noticeService: NoticeService) {

  }

  ngOnInit(): void {
    this.getNavigation();
    this.getLoadingUpdates();
    this.getNotifications();
  }

  getNavigation() {
    this.navigationService.navigation
      .subscribe(
        (navigation: NavigationItemGroup[]) => {
          this.navigation = navigation;
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

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
