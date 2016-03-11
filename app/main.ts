import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.component';
import { HistoryService } from './history.service'
import { LocationStrategy, Location, HashLocationStrategy } from 'angular2/router';
bootstrap(AppComponent, [ 
    HTTP_PROVIDERS, 
    HistoryService
]);
