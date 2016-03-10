import {Component} from 'angular2/core';
import { BggService } from './bgg.service';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'app',
    template: `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">{{title}}</a>
                </div>
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['Dashboard']">Search</a></li>
                    <li><a [routerLink]="['History']">History</a></li>
                </ul>
            </div>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    providers: [
      ROUTER_PROVIDERS,
      BggService
    ]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryComponent
  }
])

export class AppComponent {
  title = 'Board Game Geek Dashboard'
}
