/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {HomeRoutes} from "./home/home.routes";

export const PagesRoutes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: "/home"
    },
    {
        path: "",
        component: PagesComponent,
        data: {
            animation: {
                value: "pages"
            }
        },
        children: [
            {
                path: 'about',
                loadChildren: "app/pages/about/about.module#AboutModule",
                data: {
                    animation: {
                        value: 'about',
                    }
                }
            },
            {
                path: 'home',
                children: [
                    ...HomeRoutes
                ],
                data: {
                    animation: {
                        value: 'home',
                    }
                }
            },
            {
                path: 'problems',
                loadChildren: "app/pages/problem-pages/problem-pages.module#ProblemPagesModule",
            },
            {
                path: 'ideas',
                loadChildren: "app/pages/idea-pages/idea-pages.module#IdeaPagesModule"
            },
            {
                path: 'users',
                loadChildren: 'app/pages/user-pages/user-pages.module#UserPagesModule'
            },
            {
                path: 'organizations',
                loadChildren: 'app/pages/organization-pages/organization-pages.module#OrganizationPagesModule'
            },
            {
                path: 'announcements',
                loadChildren: 'app/pages/announcement-pages/announcement-pages.module#AnnouncementPagesModule',
                data: {
                    animation: {
                        value: 'announcements',
                    }
                }
            },
            {
                path: 'a/feed',
                loadChildren: 'app/pages/announcement-pages/announcement-feed-page/announcement-feed-page.module#AnnouncementFeedPageModule',
                data: {
                    pageSize: 10,
                    animation: {
                        value: 'feed',
                    }
                }
            },
            {
                path: 'search',
                loadChildren: 'app/pages/search-pages/search-pages.module#SearchPagesModule'
            },
            {
                path: 'notices',
                loadChildren: 'app/pages/notice-pages/notice-pages.module#NoticePagesModule'
            },
            {
                path: 'transactions',
                loadChildren: 'app/pages/transaction-pages/transaction-pages.module#TransactionPagesModule'
            },
            {
                path: 'security-profile/init',
                loadChildren: 'app/pages/security-profile-pages/security-profile-initialization-page' +
                '/security-profile-initialization-page.module#SecurityProfileInitializationPageModule'
            }]
    }
];
