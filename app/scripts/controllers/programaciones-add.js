'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesAddCtrl
 * @description
 * # ProgramacionesAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesAddCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, programacionesservice, servicio) {
 
    $scope.programacion = {};
    $scope.programacion.monto = 0;
    $scope.programacion.servicio = servicio;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacion = function(programacion, boton) {
        $utilsViewService.disable('#' + boton);
        
        programacionesservice.save(programacion, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
});