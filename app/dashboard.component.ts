import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES } from 'angular2/common';
import { BggService } from './bgg.service';
import * as xmltojson from 'xmltojson';

@Component ({
  selector: 'bgg-dashboard',
  templateUrl: 'app/dashboard.component.html',
  directives: [ FORM_DIRECTIVES ]
})

export class DashboardComponent {
  
  ids: string;
  games: string;
  err: Array<string>;

  idSearch = {
    query: ""
  }

  constructor(
      private _router: Router,
      private _bggService: BggService) {
  }

  onSubmitIdSearch() {
    this._bggService.getGamesBySearch(this.idSearch.query)
        .subscribe(
            data => this.ids = this.parseIdRecords(data),
            err => this.err = err,
            () => this._bggService.getGamesByIds(this.ids)
                    .subscribe(
                        data => this.games = data,
                        err => this.err = err,
                        () => console.log('API Call Complete to BGG for Game Data')
                    )
        );
  }

  parseIdRecords(xml) {
    var json = xmltojson.parseString(xml);
    var arr = json['items'][0]['item'];
    
    var ids = "";
    for(var i = 0; i < arr.length; i++) {
        ids = ids + arr[i]._attr.id._value + ', ';
    }
    return ids.substring(0, ids.length - 2);
  }

}
