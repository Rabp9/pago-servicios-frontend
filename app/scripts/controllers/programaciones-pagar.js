'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesPagarCtrl
 * @description
 * # ProgramacionesPagarCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesPagarCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, programacionesservice, programacion, tipo, servicio) {
 
    $scope.init = function() {
        programacionesservice.get({id: programacion.id}, function(data) {
            $scope.programacion = data.programacion;
            $scope.tipo = tipo;
            $scope.servicio = servicio;
        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacion = function(programacion, boton) {
        $utilsViewService.disable('#' + boton);
                
        if ($scope.fecha_pre !== null) {
            programacion.fecha_pago = formatDate($scope.fecha_pre);
        }
        programacion.estado_id = 3;
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