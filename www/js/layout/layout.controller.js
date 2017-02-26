(function(){
    'use strict';

    angular
        .module('app.layout')
        .controller('layoutController', layoutController)

    layoutController.$inject = ['$state'];

    function layoutController($state) {
        /* jshint validthis:true */
        var vm = this;
vm.title="Progress Bar Demo";
        activate();

        function activate() { }
    }
})();