/**
 * Project: angular2-google-maps
 * File:  2016-03-19 21:53
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */
import {Directive, Input, Output, OnInit, OnDestroy, EventEmitter} from 'angular2/core';
import {MapsManager} from '../services/maps-manager';
import {GoogleMapComponent} from './google-map';

@Directive({
    selector: 'google-map-marker',
})
export class GoogleMapMakerDirective implements OnInit, OnDestroy {
    private _marker: Promise<google.maps.Marker>;
    private _markerResolver: (marker: google.maps.Marker) => void;
    private _mapComponent: GoogleMapComponent = null;

    /**
     * Delay marker initialization
     */
    private _delay: number;

    constructor(private _mapsManager: MapsManager) {
        this._marker = new Promise(resolve => this._markerResolver = resolve);
    }

    /*
     * Outputs events
     * **********************************************************
     */

    /**
     * This event is fired when the marker icon was clicked.
     */
    @Output()
    click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /**
     * This event is fired when the marker icon was double clicked.
     */
    @Output()
    dblclick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /**
     * This event is fired for a rightclick on the marker.
     */
    @Output()
    rightclick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /**
     * This event is fired when the marker position property changes.
     */
    @Output()
    position_changed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * This event is fired when the marker icon property changes.
     */
    @Output()
    icon_changed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * This event is fired when the marker title property changes.
     */
    @Output()
    title_changed: EventEmitter<void> = new EventEmitter<void>();

    /**
     * This event is fired when the marker visible property changes.
     */
    @Output()
    visible_changed: EventEmitter<void> = new EventEmitter<void>();


    /*
     * Inputs options
     * **********************************************************
     */

    /**
     * Marker position
     */
    @Input()
    set position(value: google.maps.LatLngLiteral | Coordinates | {latitude: number, longitude: number}) {
        this._marker.then(marker => {
            marker.setPosition({
                lat: (<google.maps.LatLngLiteral>value).lat || (<Coordinates>value).latitude,
                lng: (<google.maps.LatLngLiteral>value).lng || (<Coordinates>value).longitude
            });
        });
    }

    /**
     * If true, the marker receives mouse and touch events.
     * Default value is true.
     */
    @Input()
    set clickable(mode: boolean) {
        this._marker.then(marker => marker.setClickable(mode));
    }

    /**
     * Icon for the foreground. If a string is provided,
     * it is treated as though it were an Icon with the string as url.
     */
    @Input()
    set icon(value: string | google.maps.Icon) {
        this._marker.then(marker => marker.setIcon(value));
    }

    /**
     * The marker's opacity between 0.0 and 1.0.
     */
    @Input()
    set opacity(value: number) {
        this._marker.then(marker => marker.setOpacity(value));
    }

    /**
     * Rollover text
     */
    @Input()
    set title(value: string) {
        this._marker.then(marker => marker.setTitle(value));
    }

    /**
     * If true, the marker is visible
     */
    @Input()
    set visible(mode: boolean) {
        this._marker.then(marker => marker.setVisible(mode));
    }

    /**
     * Set marker zIndex for displayed on the map
     */
    @Input()
    set zIndex(value: number) {
        this._marker.then(marker => marker.setZIndex(value));
    }


    @Input()
    set animation(value: google.maps.Animation) {
        this._marker.then(marker => marker.setAnimation(<google.maps.Animation>value));
    }

    @Input()
    set delay(value: number) {
        this._delay = value;
    }

    /*
     * Internal logic
     * **********************************************************
     */

    hasMapComponent(): boolean {
        return !!this._mapComponent;
    }

    setMapComponent(component: GoogleMapComponent, map: google.maps.Map): void {
        this._mapComponent = component;
        this._marker.then(marker => setTimeout(() => marker.setMap(map), this._delay || 0));
    }

    ngOnInit(): void {
        this._mapsManager.createMarker()
            .then(marker => {
                this.bindEvents(marker);
                this._markerResolver(marker)
            });
    }

    ngOnDestroy(): void {
        this._marker.then(marker => {
            google.maps.event.clearInstanceListeners(marker);
            marker.setMap(null);
        });
    }

    private bindEvents(marker: google.maps.Marker) {
        marker.addListener('click', e => this.click.emit(e));
        marker.addListener('dblclick', e => this.dblclick.emit(e));
        marker.addListener('rightclick', e => this.rightclick.emit(e));
        marker.addListener('position_changed', e => this.position_changed.emit(e));
        marker.addListener('title_changed', e => this.title_changed.emit(e));
        marker.addListener('icon_changed', e => this.icon_changed.emit(e));
        marker.addListener('visible_changed', e => this.visible_changed.emit(e));
    }
}
