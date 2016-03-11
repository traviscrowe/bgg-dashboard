import { Http, Response, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {
    queryHistory;
    gamesHistory;
    
    addResponse(query: Object): void {
        if(this.queryHistory === undefined) {
            this.queryHistory = new Array<Object>();
        }
        this.queryHistory.push(query);
    }
    
    addGames(games: Array<Object>): void { 
        if(this.gamesHistory === undefined) {
            this.gamesHistory = new Array<Object>();
        }
        this.gamesHistory.push(games)
    }
}