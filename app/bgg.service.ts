import { Http, Response, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';
import 'rxjs/add/operator/map';

declare function parseString(str): string;

@Injectable()
export class BggService {
  private data: string;
  err: Array<string>;

  constructor(public _http: Http) {
  }

  getGamesBySearch(query) {
    var headers = new Headers();
    // headers.append('Cookie','bggusername=Broshevik; ' +
    // 'bggpassword=a1le5vkcfi5exdk8jgkk10a2fjc9xc7as; ' +
    // 'SessionID=6e7e830fd5ea20fbeab3e61e606179f959dce50bu728135');
    headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    var url = 'https://www.boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=' + query;
    return this._http.get(url, headers).map((res:Response) => res.text());
  }
  
  getGamesByIds(ids) {
    var headers = new Headers();
    // headers.append('Cookie','bggusername=Broshevik; ' +
    // 'bggpassword=a1le5vkcfi5exdk8jgkk10a2fjc9xc7as; ' +
    // 'SessionID=6e7e830fd5ea20fbeab3e61e606179f959dce50bu728135');
    headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    var url = 'https://www.boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=' + ids;
    return this._http.get(url, headers).map((res:Response) => res.text());
  }
}
