import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES } from 'angular2/common';
import { BggService } from './bgg.service';
import { HistoryService } from './history.service';
import { HistoryComponent } from './history.component'
/// <reference path='xmltojson.d.ts'>
import * as xmltojson from 'xmltojson';

@Component ({
    selector: 'bgg-dashboard',
    templateUrl: 'app/dashboard.component.html',
    directives: [ FORM_DIRECTIVES ],
    providers: [ HistoryComponent ]
})

export class DashboardComponent {
  
    ids: string;
    games: Array<Object>;
    err: Array<string>;

    idSearch = {
        value: '',
        expansion: false
    }

    constructor(
        private _router: Router,
        private _bggService: BggService,
        private _historyComponent: HistoryComponent,
        private _historyService: HistoryService) {
    }

    onSubmitIdSearch(): void {
        this._bggService.getGamesBySearch(this.idSearch)
            .subscribe(
                data => this.ids = this.parseIdRecords(data),
                err => this.err = err,
                () => this._bggService.getGamesByIds(this.ids)
                        .subscribe(
                            data => this.games = this.parseGameData(data),
                            err => this.err = err,
                            () => console.log('API Call Complete to BGG for Game Data')
                        )
            );
        this._historyService.addResponse(this.idSearch);
    }

    parseIdRecords(xml: string): string {
        var json = xmltojson.parseString(xml, null);
        var arr = json['items'][0]['item'];

        var ids = '';
        for(var i = 0; i < arr.length; i++) {
            ids = ids + arr[i]._attr.id._value + ', ';
        }
        return ids.substring(0, ids.length - 2);
    }

    parseGameData(xml: string): Array<Object> {
        var json = xmltojson.parseString(xml, null);
        var arr = json['items'][0]['item'];
        
        var gameData: Array<Object> = new Array<Object>();
        
        for(var i = 0; i < arr.length; i++) {
            var cur = arr[i];
            var primaryName = '';
            
            for(var n of cur.name) {
                if(n._attr.type._value === 'primary') primaryName = n._attr.value._value;
            }
            
            gameData.push({
                id: cur._attr.id._value,
                type: cur._attr.id._value,
                name: primaryName,
                ages: cur.minage[0]._attr.value._value + '+',
                players: cur.minplayers[0]._attr.value._value + ' - ' + cur.maxplayers[0]._attr.value._value,
                playTime: cur.minplaytime[0]._attr.value._value + ' - ' + cur.maxplaytime[0]._attr.value._value + ' minutes',
                yearPublished: cur.yearpublished[0]._attr.value._value,
                description: cur.description[0]._text,
                image: cur.image != null ? cur.image[0]._text : ''
            })
        }
        
        return gameData;
    }
}
