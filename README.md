# Installation

```bash
npm install angular2-google-map --save
```

# Quick start

```typescript
// main.ts

import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-map/core';

bootstrap(App, [
    ....,
    GOOGLE_MAPS_PROVIDERS
]
```

```html
// View

<google-map [center]="{lat: -34.397, lng: 150.644}" style="width: 100%; height: 100%">
   <google-map-marker [position]="{lat: -34.397, lng: 150.644}"></google-map-marker>
</google-map>
```


# Support options (`input`, `output`)

### `<google-map>` ([see](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)):
- [backgroundColor]           = "string"
- [center]                    = "{lat: number, lng: number} | {latitude: number, longitude: number} | Coordinates"
- [disableDoubleClickZoom]    = "boolean"
- [draggable]                 = "boolean"
- [keyboardShortcuts]         = "boolean"
- [scrollwheel]               = "boolean"
- [zoom]                      = "number"
- [minZoom]                   = "number"
- [maxZoom]                   = "number"
- [disableDefaultUI]          = "boolean"
- [mapTypeControl]            = "boolean"
- [rotateControl]             = "boolean"
- [scaleControl]              = "boolean"
- [streetViewControl]         = "boolean"
- [zoomControl]               = "boolean"


### `<google-map-marker>` ([see](https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions)):
- [position]  = "{lat: number, lng: number} | {latitude: number, longitude: number} | Coordinates"
- [clickable] = "boolean"
- [icon]      = "string"
- [opacity]   = "number"
- [title]     = "string"
- [visible]   = "boolean"
- [zIndex]    = "number"
- [animation] = "number"
- [delay]     = "number" - Delay marker initialization

**Events**
- (click)             = "onHandle($event)"
- (dblclick)          = "onHandle($event)"
- (rightclick)        = "onHandle($event)"
- (position_changed)  = "onHandle($event)"
- (title_changed)     = "onHandle($event)"
- (icon_changed)      = "onHandle($event)"
- (visible_changed)   = "onHandle($event)"

# Licence

MIT

*The inspiration for this project has served this library [SebastianM/angular2-google-maps](https://github.com/SebastianM/angular2-google-maps), 
but which blocking dependency Angular2...*
