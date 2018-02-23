'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RecibosPagarCtrl
 * @description
 * # RecibosPagarCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RecibosPagarCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, recibosservice, recibo) {
 
    $scope.init = function() {
        recibosservice.get({id: recibo.id}, function(data) {
            $scope.recibo = data.recibo;
        });
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveRecibo = function(recibo, boton) {
        $utilsViewService.disable('#' + boton);
                
        if ($scope.fecha_pre !== null) {
            recibo.fecha_pago = formatDate($scope.fecha_pre);
        }
        recibo.estado_id = 3;
        recibosservice.save(recibo, function (data) {
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