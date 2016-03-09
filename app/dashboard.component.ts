import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES } from 'angular2/common';
import { BggService } from './bgg.service';

@Component ({
  selector: 'bgg-dashboard',
  templateUrl: 'app/dashboard.component.html',
  directives: [ FORM_DIRECTIVES ]
})

export class DashboardComponent {

  data: Document;
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
      data => this.data = this.parseRecords(data),
      err => this.err = err,
      () => console.log('API Call Complete to BGG'));
  }

  parseRecords(xml) {
    var x = new DOMParser().parseFromString(xml, "text/xml");
    return x;
  }

}
