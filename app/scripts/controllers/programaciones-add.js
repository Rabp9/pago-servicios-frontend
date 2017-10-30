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
    $utilsViewService, programacionesservice, servicio, tipo) {
 
    $scope.programacion = {};
    $scope.programacion.monto = 0;
    $scope.programacion.servicio = servicio;
    $scope.programacion.servicio.tipo = tipo;
    $scope.programacion.dias_mensaje = 5;
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacion = function(programacion, boton) {
        $utilsViewService.disable('#' + boton);
        
        if ($scope.fecha_pre !== null) {
            programacion.fecha_vencimiento = formatDate($scope.fecha_pre);
        }
        programacion.estado_id = 4;
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
});