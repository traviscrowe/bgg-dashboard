import { Http, Response, Headers } from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map'

@Injectable()
export class BggService {

  constructor(public _http: Http) {
  }

  getGamesBySearch(query) {
    var headers = new Headers();
    headers.append('Content-Type', 'text/xml');
    var url = 'https://www.boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=' + query
    var resp = this._http.get(url, { headers: headers }).map((res: Response) => { return res.json() })
    console.log(resp)
  }
}
