'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ServiciosAddCtrl
 * @description
 * # ServiciosAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ServiciosAddCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, serviciosservice, tiposservice) {

    $scope.init = function() {
        $scope.loading = true;
        tiposservice.get(function(data) {
            $scope.tipos = data.tipos;
            $scope.loading = false;
            $('#txtDescripcion').focus();
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveServicio = function(servicio, boton) {
        $utilsViewService.disable('#' + boton);
        
        serviciosservice.save(servicio, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});