import { Http, Response, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BggService {
  private data: string;
  err: Array<string>;
  typeQuery: string;

  constructor(public _http: Http) {
      this.typeQuery = 'boardgame';
  }

  getGamesBySearch(query) {
    var headers = new Headers();
    headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    
    if(query.expansion) {
        this.typeQuery += ',boardgameexpansion';
    }
    
    var url = 'https://www.boardgamegeek.com/xmlapi2/search?type=' + this.typeQuery + '&query=' + query.value;
    return this._http.get(url, headers).map((res:Response) => res.text());
  }
  
  getGamesByIds(ids) {
    var headers = new Headers();
    headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    
    var url = 'https://www.boardgamegeek.com/xmlapi2/thing?type=' + this.typeQuery + '&id=' + ids;
    return this._http.get(url, headers).map((res:Response) => res.text());
  }
}
