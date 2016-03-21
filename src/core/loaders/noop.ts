/**
 * Project: angular2-google-maps
 * File:  2016-03-20 14:36
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {LoaderGoogleMapsApi} from '../loader';

export class NoopLoaderGoogleMapsApi implements LoaderGoogleMapsApi {
    load(): Promise<void> {
        if (!(google && google.maps)) {
            return Promise.reject('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        } else {
            return Promise.resolve();
        }
    }
}
