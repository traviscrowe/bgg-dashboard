import { Component, provide } from 'angular2/core';
import { BggService } from './bgg.service';
import { SearchComponent } from './search.component';
import { HistoryComponent } from './history.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

@Component({
    selector: 'app',
    template: `
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand">{{title}}</a>
                </div>
                <ul class="nav navbar-nav">
                    <li><a [routerLink]="['Search']">Search</a></li>
                    <li><a [routerLink]="['History']">History</a></li>
                </ul>
                <a href="/" class="pull-right"><img src="http://i.imgur.com/sCGovYA.jpg" height="50"></a>
            </div>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    providers: [
      ROUTER_PROVIDERS,
      BggService,
      provide(LocationStrategy, { useClass: HashLocationStrategy })
    ]
})

@RouteConfig([
  {
    path: '/search',
    name: 'Search',
    component: SearchComponent,
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
