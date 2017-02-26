// (function () {
//     'use strict';

//     angular
//         .module('app.progressbar')
//         .run(appRun);

//     appRun.$inject = ['routeHelper'];

//     function appRun(routeHelper) {
//         routeHelper.configureStates(getStates());
//     }
//     function getStates() {
//         return [
//             {

//                 state: 'progressbar',
//                 config: {
//                     url: '/progressbar',
//                     templateUrl: 'js/progressbar/progressbar.html',
//                     controller: 'progressbarController',
//                     controllerAs: 'vm',
//                     title: 'progressbar',

//                 }
//             }
//         ]
//     }

// }());