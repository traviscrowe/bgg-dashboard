import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES } from 'angular2/common';
import { BggService } from './bgg.service';

@Component ({
  selector: 'bgg-dashboard',
  templateUrl: 'app/dashboard.component.html',
  directives: [FORM_DIRECTIVES]
})

export class DashboardComponent {

  idSearch = {
    query: ""
  }

  constructor(
      private _router: Router,
      private _bggService: BggService) {
  }

  onSubmitIdSearch() {
    this._bggService.getGamesBySearch(this.idSearch.query)
  }
}
