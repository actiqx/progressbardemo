(function() {
    'use strict';

    angular
        .module('app.core')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
          // if none of the above states are matched, use this as the fallback
          $urlRouterProvider.otherwise('/main');

          // $urlRouterProvider
          //       .when('/main', '/main/progressbar')
          //       .otherwise('/main/progressbar');
          // //Enable Html5Mode
        //$locationProvider.html5Mode(true).hashPrefix('!')

            $stateProvider
              .state('main', {
              url: '/main',
              templateUrl: 'js/progressbar/progressbar.html',
              controller: 'progressbarController',
              controllerAs: 'vm',
              title: 'progressbar',
              abstrct:true
              
            });

        })

})();
