/**
 * Project: angular2-google-maps
 * File:  2016-03-19 23:00
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {Component} from 'angular2/core';
import {GOOGLE_MAPS_DIRECTIVES} from '../../core';

@Component({
    selector: 'app',
    templateUrl: '/app/app.html',
    directives: [GOOGLE_MAPS_DIRECTIVES]
})
export class AppComponent {
    lat: number = -34.397;
    lng: number = 150.644;

    maxZoom = 10;
    minZoom = 8;

    onClick() {
        alert(1);
    }
}