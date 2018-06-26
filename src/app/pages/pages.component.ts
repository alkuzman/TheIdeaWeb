/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../core/navigation/navigation.service';
import {LoadingState} from '../core/loading/loading-state';
import {LoadingService} from '../core/loading/loading.service';
import {ScrollService} from '../core/scrolling/scroll-service';
import {RedirectService} from '../core/navigation/redirect.service';
import {SocketService} from '../core/socket/socket.service';
import {NoticeService} from '../domain/services/notice/notice.service';
import {Subscription} from 'rxjs';
import {NavigationItemGroup} from '../core/navigation/navigation-item-group';
import {Notice} from '../domain/model/sharing/notice';
import {AuthenticationService} from '../core/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'ideal-pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  query = '';
  searchState = false;
  navigation: NavigationItemGroup[];
  // Subject<LoadingState> = new BehaviorSubject(null);
  loadingState: LoadingState;
  numberOfNotifications = 0;
  authenticationSubscription: Subscription;
  loadingStateSubscription: Subscription;
  socketNoticeSubscription: Subscription;
  socketNoticeCountSubscription: Subscription;

  constructor(private navigationService: NavigationService, private loadingService: LoadingService,
              private scrollService: ScrollService, private redirectService: RedirectService,
              private socketService: SocketService,
              private noticeService: NoticeService, private ch: ChangeDetectorRef,
              private authenticationService: AuthenticationService) {

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
      this.ch.markForCheck();
    });
  }

  getNotifications() {
    this.noticeService.getNoticeCount().subscribe((numberOfNotifications: number) => {
      this.setNumberOfNotifications(numberOfNotifications);
    });
    this.socketNoticeSubscription = this.socketService.newNoticeMessage().subscribe((notice: Notice) => {
      this.numberOfNotifications++;
    });
    this.socketNoticeCountSubscription = this.socketService.newNoticeCountMessage().subscribe((count: number) => {
      this.numberOfNotifications = count;
    });
    this.authenticationSubscription = this.authenticationService.authenticationObservable().subscribe((authenticated: boolean) => {
      if (!authenticated) {
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
    this.socketNoticeSubscription.unsubscribe();
    this.authenticationSubscription.unsubscribe();
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
