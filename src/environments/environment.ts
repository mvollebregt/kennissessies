// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {apiKey} from './api-key';

export const environment = {
  production: false,
  firebase: {
    apiKey,
    authDomain: 'kennissessies-idx.firebaseapp.com',
    databaseURL: 'https://kennissessies-idx.firebaseio.com',
    projectId: 'kennissessies-idx',
    storageBucket: 'kennissessies-idx.appspot.com',
    messagingSenderId: '971104013198',
    appId: '1:971104013198:web:39a8e227f473be3151f2df'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
