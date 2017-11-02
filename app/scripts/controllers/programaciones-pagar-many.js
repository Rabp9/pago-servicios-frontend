'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesPagarManyCtrl
 * @description
 * # ProgramacionesPagarManyCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesPagarManyCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, programacionesservice, programaciones_id) {

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacionesMany = function(fecha_pre, nro_documento, boton) {
        $utilsViewService.disable('#' + boton);
        var fecha_pago = '';
                
        if ($scope.fecha_pre !== null) {
            fecha_pago = formatDate(fecha_pre);
        }
        
        programacionesservice.pagarMany({
            programaciones: programaciones_id,
            fecha_pago: fecha_pago,
            nro_documento: nro_documento
        }, function (data) {
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