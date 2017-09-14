'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:PagosCtrl
 * @description
 * # PagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('PagosCtrl', function ($scope, pagosservice) {
    
    $scope.search = {};
    $scope.search.estado_id = "";
    
    $scope.init = function() {
        $scope.loading = true;
        pagosservice.get(function(data) {
            $scope.pagos = data.pagos;
            $scope.loading = false;
        });
    };
    
    $scope.init();
});