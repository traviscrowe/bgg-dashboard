import { Component, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { HistoryService } from './history.service';

@Component({
  selector: 'bgg-history',
  templateUrl: 'app/history.component.html',
  providers: [ ]
})

export class HistoryComponent { 
    
    queryHistory;
    
    constructor(_router: Router, _historyService: HistoryService) {
        this.queryHistory = _historyService.queryHistory;
    }
}
