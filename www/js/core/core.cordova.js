(function() {
    'use strict';

    angular
        .module('app.core')
        .run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    window.plugins.orientationLock.lock("portrait");
  }, false);
  /* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/
})


})();
