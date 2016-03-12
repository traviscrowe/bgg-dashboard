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
    templateUrl: 'app/search.component.html',
    directives: [ FORM_DIRECTIVES ],
    providers: [ HistoryComponent ]
})

export class SearchComponent {
  
    searching: boolean = false;
    ids: string;
    games: Array<Object>;
    err: Array<string>;

    idSearch = {
        value: '',
        expansion: false
    }
    
    history = {
        datetime: null,
        query: '',
        matches: [],
        expansion: false 
    }

    constructor(
        private _router: Router,
        private _bggService: BggService,
        private _historyComponent: HistoryComponent,
        private _historyService: HistoryService) {
            this.games = new Array<Object>();
            if(_historyService.gamesHistory !== undefined && _historyService.gamesHistory.length > 0) {
                this.games = _historyService.gamesHistory[0];
            }
    }

    onSubmitIdSearch(): void {
        this.searching = true;
        this._bggService.getGamesBySearch(this.idSearch)
            .subscribe(
                data => this.ids = this.parseIdRecords(data),
                err => this.err = err,
                () => this._bggService.getGamesByIds(this.ids)
                        .subscribe(
                            data => this.games = this.parseGameData(data),
                            err => this.err = err,
                            () => this._historyService.addResponse(this.getRequestHistory(this.idSearch, this.games))
                        )
            );
        
    }

    parseIdRecords(xml: string): string {
        var json = xmltojson.parseString(xml, null);
        
        if(!json['items'][0].hasOwnProperty('item')) {
            return '';
        }
        var arr = json['items'][0]['item'];

        var ids = '';
        for(var i = 0; i < arr.length; i++) {
            ids = ids + arr[i]._attr.id._value + ',';
        }
        return ids.substring(0, ids.length - 2);
    }

    parseGameData(xml: string): Array<Object> {
        var json = xmltojson.parseString(xml, null);
        
        if(!json['items'][0].hasOwnProperty('item')) {
            return null;
        }
        var arr = json['items'][0]['item'];
        
        var gameData: Array<Object> = new Array<Object>();
        
        for(var i = 0; i < arr.length; i++) {
            var cur = arr[i];
            var primaryName = '';
            var totalPlayTime = '';
            var totalPlayers = '';
            
            for(var n of cur.name) {
                if(n._attr.type._value === 'primary') primaryName = n._attr.value._value;
            }
            
            if(cur.minplaytime[0]._attr.value._value === cur.maxplaytime[0]._attr.value._value) {
                totalPlayTime = cur.maxplaytime[0]._attr.value._value + ' minutes';
            } else { 
                totalPlayTime = cur.minplaytime[0]._attr.value._value + ' - ' + cur.maxplaytime[0]._attr.value._value + ' minutes';
            }
            
            if(cur.minplayers[0]._attr.value._value === cur.maxplayers[0]._attr.value._value) {
                totalPlayers = cur.minplayers[0]._attr.value._value;
            } else {
                totalPlayers = cur.minplayers[0]._attr.value._value + ' - ' + cur.maxplayers[0]._attr.value._value;
            }
            
            gameData.push({
                id: cur._attr.id._value,
                type: cur._attr.id._value,
                name: primaryName,
                ages: cur.minage[0]._attr.value._value + '+',
                players: totalPlayers,
                playTime: totalPlayTime === '0 minutes' ? '' : totalPlayTime,
                yearPublished: cur.yearpublished[0]._attr.value._value,
                description: cur.description[0]._text,
                image: cur.image != null ? 'http:' + cur.image[0]._text : ''
            })
        }
        this._historyService.gamesHistory = new Array<Object>();
        this._historyService.addGames(gameData);
        
        return gameData;
    }
    
    getRequestHistory(idSearch: Object, games: Array<Object>): Object {
        this.searching = false;
        var matches: string = ''
        
        if(games === null) {
            return {
                datetime: new Date(),
                query: idSearch['value'],
                expansion: idSearch['expansion'],
                matches: null
            };
        }
        
        for(var game of games) {
            matches = matches + game['name'] + ' [' + game['id'] + ']' + ', ';
        }
        matches = matches.substring(0, matches.length - 2);
        
        return {
            datetime: new Date(),
            query: idSearch['value'],
            expansion: idSearch['expansion'],
            matches: matches
        };
    }
}
