// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBFzaiWaSVXjXRZ-hKBY55RFm04jjzAF_I",
    authDomain: "photography-portfolio-8f6a1.firebaseapp.com",
    projectId: "photography-portfolio-8f6a1",
    storageBucket: "photography-portfolio-8f6a1.appspot.com",
    messagingSenderId: "1009050479100",
    appId: "1:1009050479100:web:f369dee4bc5cd907e9ea79",
    measurementId: "G-FCKNLE7917"
  },
  imageDirectory: "test",
  imageUrl: "gs://photography-portfolio-8f6a1.appspot.com",
  backgroundDirectory: "background",
  databaseUrl: "https://photography-portfolio-8f6a1-default-rtdb.firebaseio.com/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
