(function () {
    'use strict';

    angular
        .module('app')
        .service('progressbarService', progressbarService)

    progressbarService.$inject = ['$http'];

    function progressbarService($http) {
        var progressbarurl = "api/data.json";
        var serviceCalls = {
                  getProgressbarData: getProgressbarData
                 
              };
          return serviceCalls;
        

        function getProgressbarData() {

            $http.get(progressbarurl).then(function(res)  {
              var data= res.data;
              
            });
            

        }
    }
})();