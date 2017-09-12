'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ServiciosEditCtrl
 * @description
 * # ServiciosEditCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ServiciosEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, serviciosservice, servicio_id) {

    $scope.init = function() {
        serviciosservice.get({id: servicio_id}, function(data) {
            $scope.servicio = data.servicio;
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