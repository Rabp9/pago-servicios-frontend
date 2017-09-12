'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesEditCtrl
 * @description
 * # ProgramacionesEditCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, programacionesservice, programacion) {
 
    $scope.init = function() {
        programacionesservice.get({id: programacion.id}, function(data) {
            $scope.programacion = data.programacion;
        });
    };

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
    
    $scope.init();
});