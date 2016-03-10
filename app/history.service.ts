import { Http, Response, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {
    queryHistory;
    
    addResponse(query: Object): void {
        if(this.queryHistory === undefined) {
            this.queryHistory = new Array<Object>();
        }
        this.queryHistory.push(query);
    }
}