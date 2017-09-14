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
                
        if ($scope.fecha_pre !== null) {
            programacion.fecha = formatDate($scope.fecha_pre);
        }
        programacionesservice.save(programacion, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    function formatDate(fecha) {
        if (fecha === undefined) {
            return undefined;
        }
        return fecha.getFullYear() + '-' + str_pad((fecha.getMonth() + 1), '00') + '-' + str_pad(fecha.getDate(), '00');
    }
    
    function str_pad(str, pad) {
        return pad.substring(0, (pad.length - str.toString().length)) + str;
    }
    
    $scope.init();
});