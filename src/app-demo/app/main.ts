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
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

import {GOOGLE_MAPS_PROVIDERS} from '../../core';

bootstrap(AppComponent, [GOOGLE_MAPS_PROVIDERS]);