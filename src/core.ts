/**
 * Project: angular2-google-maps
 * File:  2016-03-19 21:54
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {Provider} from 'angular2/core';

import {LoaderGoogleMapsApi} from './core/loader';
import {LazyLoaderGoogleMapsApi, LAZY_LOADER_OPTIONS, LOADER_OPTIONS_DEFAULT} from './core/loaders/lazy';
import {MapsManager} from './services/maps-manager';

/**
 * The following list shows the approximate level of detail
 * you can expect to see at each zoom level
 */
export enum ZoomLevel {
    World       = 1,
    Continent   = 5,
    City        = 10,
    Streets     = 15,
    Buildings   = 20
}

/**
 * Animations that can be played on a marker.
 * @see https://developers.google.com/maps/documentation/javascript/reference?hl=ru#Animation
 */
export enum Animation {
    /**
     * Marker bounces until animation is stopped.
     */
    BOUNCE = 1,

    /**
     * Marker falls from the top of the map ending with a small bounce.
     */
    DROP = 2
}

export {LoaderGoogleMapsApi, LazyLoaderGoogleMapsApi, LAZY_LOADER_OPTIONS};
export {NoopLoaderGoogleMapsApi} from './core/loaders/noop';

export const GOOGLE_MAPS_PROVIDERS: any[] = [
    new Provider(LAZY_LOADER_OPTIONS, {useValue: LOADER_OPTIONS_DEFAULT}),
    new Provider(LoaderGoogleMapsApi, {useClass: LazyLoaderGoogleMapsApi}),
    new Provider(MapsManager, {useClass: MapsManager}),
];
