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
    $utilsViewService, serviciosservice) {

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
});