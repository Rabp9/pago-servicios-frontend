'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:PagosCtrl
 * @description
 * # PagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('PagosCtrl', function ($scope, pagosservice, $uibModal) {
    
    $scope.search = {};
    $scope.search.estado_id = "";
    
    $scope.init = function() {
        $scope.loading = true;
        pagosservice.get(function(data) {
            $scope.pagos = data.pagos;
            $scope.loading = false;
        });
    };
    
    $scope.showPagosRegistrar = function() {
        var modalInstanceRegistrar = $uibModal.open({
            templateUrl: 'views/pagos-registrar.html',
            controller: 'PagosRegistrarCtrl',
            backdrop: false
        });

        modalInstanceRegistrar.result.then(function (data) {
            $scope.message = data;
            $scope.pagos.push(data.pago);
        });
    };
    
    $scope.init();
});