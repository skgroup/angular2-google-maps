/**
 * Project: angular2-google-maps
 * File:  2016-03-20 14:43
 * ----------------------------------------------
 *
 * @author      Stanislav Kiryukhin <korsar.zn@gmail.com>
 * @copyright   Copyright (c) 2016, Core12 Team
 *
 * ----------------------------------------------
 * All Rights Reserved.
 * ----------------------------------------------
 */

export abstract class LoaderGoogleMapsApi {
    abstract load(): Promise<void>;
}
