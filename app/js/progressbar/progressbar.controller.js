(function () {
    'use strict';

    angular
        .module('app.progressbar')
        .controller('progressbarController', progressbarController)

    progressbarController.$inject = ['$http','$location','progressbarService'];

    function progressbarController($http, $location,progressbarService) {
        /* jshint validthis:true */

        var vm = this;
        $http.get('api/data.json').then(function (res){
		vm.DataObject = res.data;
	});
        // progressbarService.getProgressbarData(). {
        //    vm.DataObject = data;
        // }
        
        // vm.DataObject = {
        //     "buttons": [
        //         10,
        //         38,
        //         -13,
        //         -18
        //     ],
        //     "bars": [
        //         62,
        //         45,
        //         62
        //     ],
        //     "limit": 230
        // };
        vm.ProgressBarList = [{ Id: 1, Name: "#progress1" }, { Id: 2, Name: "#progress2" }, { Id: 3, Name: "#progress3" }]
        vm.SelectedProgressBar = null;
        vm.SetBarPercentage = function (_val) {
            if (_val <= 100) {
                return { width: _val + "%" }
            }
           
            else {
                return {
                    "width": "100%",
                    "background": "#F44336"
                }
            }

        }

        vm.SetValOnBtnClick = function (_val) {
            vm.DataObject.bars[vm.SelectedProgressBar - 1] = vm.DataObject.bars[vm.SelectedProgressBar - 1] + _val;
            if(vm.DataObject.bars[vm.SelectedProgressBar - 1]<0 )
            {
                vm.DataObject.bars[vm.SelectedProgressBar - 1]=0;

            }
            else if(vm.DataObject.bars[vm.SelectedProgressBar - 1] > vm.DataObject.limit)
            {
                vm.DataObject.bars[vm.SelectedProgressBar - 1]=vm.DataObject.limit;
            }
            

        }


    }
})();