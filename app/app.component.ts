import {Component} from 'angular2/core';
import { BggService } from './bgg.service';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'app',
    template: `
      <h1>{{title}}</h1>
      <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['History']">History</a>
      </nav>
      <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
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
