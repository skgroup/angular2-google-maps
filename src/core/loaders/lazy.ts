/**
 * Project: angular2-google-maps
 * File:  2016-03-20 03:09
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {Injectable, Inject, OpaqueToken} from 'angular2/core';
import {LoaderGoogleMapsApi} from '../loader';

export enum ScriptLoaderProtocol {AUTO, HTTP, HTTPS}

export interface LoaderOptions {
    /**
     * The Google Maps API Key (see:
     * https://developers.google.com/maps/documentation/javascript/get-api-key)
     */
    apiKey?: string;

    /**
     * Google Maps API version.
     */
    apiVersion?: string | number;

    /**
     * Protocol used for the `<script>` tag.
     */
    protocol?: ScriptLoaderProtocol;

    /**
     * Host and Path used for the `<script>` tag.
     */
    hostAndPath?: string;

    /**
     * Defines which Google Maps libraries should get loaded.
     */
    libraries?: string[];

    /**
     * The default bias for the map behavior is US.
     * If you wish to alter your application to serve different map tiles or bias the
     * application, you can overwrite the default behavior (US) by defining a `region`.
     * See https://developers.google.com/maps/documentation/javascript/basics#Region
     */
    region?: string;

    /**
     * The Google Maps API uses the browser's preferred language when displaying
     * textual information. If you wish to overwrite this behavior and force the API
     * to use a given language, you can use this setting.
     * See https://developers.google.com/maps/documentation/javascript/basics#Language
     */
    language?: string;
}

export const LAZY_LOADER_OPTIONS = new OpaqueToken('_sk.LazyLoaderGoogleMapsApiOptions');
export const LOADER_OPTIONS_DEFAULT: LoaderOptions = {
    apiVersion: 3,
    protocol: ScriptLoaderProtocol.HTTPS,
    hostAndPath: 'maps.googleapis.com/maps/api/js',
    libraries: []
};

@Injectable()
export class LazyLoaderGoogleMapsApi extends LoaderGoogleMapsApi {
    private _options: LoaderOptions;
    private _promise: Promise<void>;

    constructor(@Inject(LAZY_LOADER_OPTIONS) options: LoaderOptions) {
        super();
        this._options = Object.assign({}, LOADER_OPTIONS_DEFAULT, options);
    }

    load(): Promise<void> {
        if (this._promise) {
            return this._promise;
        }

        return this._promise = this.createPromise();
    }

    private createPromise(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const callbackName: string = `_gmi${new Date().getTime()}`;

            window[callbackName] = resolve;
            document.body.appendChild(this.createScript(callbackName, reject));
        });
    }

    private createScript(callbackName: string, onError: (error: Event) => void): HTMLScriptElement {
        let script = document.createElement('script');

        script.type    = 'text/javascript';
        script.src     = this.createScriptUrl(callbackName);
        script.async   = true;
        script.defer   = true;
        script.onerror = onError;

        return script;
    }

    private createScriptUrl(callbackName: string): string {
        return `${this.getProtocol()}//${this._options.hostAndPath}${this.getQueryParams(callbackName)}`;
    }

    private getProtocol(): string {
        switch (this._options.protocol) {
            case ScriptLoaderProtocol.AUTO:
                return '';

            case ScriptLoaderProtocol.HTTP:
                return 'http:';

            case ScriptLoaderProtocol.HTTPS:
            default:
                return 'https:';
        }
    }

    private getQueryParams(callbackName: string): string {
        const queryParams = {
            v: this._options.apiVersion,
            callback: callbackName
        };

        if (this._options.apiKey) {
            queryParams['key'] = this._options.apiKey;
        }

        if (this._options.libraries.length) {
            queryParams['libraries'] = this._options.libraries.join(',');
        }

        if (this._options.region) {
            queryParams['region'] = this._options.region;
        }

        if (this._options.language) {
            queryParams['language'] = this._options.language;
        }

        const params: string[] = [];

        for (let key in queryParams) {
            params.push(`${key}=${queryParams[key]}`);
        }

        return `?${params.join('&')}`;
    }
}
