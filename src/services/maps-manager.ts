/**
 * Project: angular2-google-maps
 * File:  2016-03-19 21:58
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {Injectable} from 'angular2/core';
import {LoaderGoogleMapsApi} from '../core/loader';
import {GoogleMapComponent} from '../components/google-map';

@Injectable()
export class MapsManager {
    private _maps: Map<string, google.maps.Map> = new Map<string, google.maps.Map>();

    constructor(private loader: LoaderGoogleMapsApi) {

    }

    createMarker(options?: google.maps.MarkerOptions): Promise<google.maps.Marker> {
        return this.loader.load().then(() => new google.maps.Marker(options));
    }

    createMap(el: HTMLElement, options?: google.maps.MapOptions): Promise<google.maps.Map> {
        return this.loader.load().then(() => new google.maps.Map(el, options));
    }

    getMap(name: string): Promise<google.maps.Map> {
        return this.loader.load().then(() => this._maps.get(name));
    }

    addMap(name: string, map: google.maps.Map): void {
        this._maps.set(name, map);
    }

    removeMap(name: string): boolean {
        return this._maps.delete(name);
    }
}
