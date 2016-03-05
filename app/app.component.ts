import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { BggService } from './bgg.service';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history.component';

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
    component: DashboardComponent,
    useAsDefault: true
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
