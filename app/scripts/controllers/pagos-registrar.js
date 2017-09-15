'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:PagosRegistrarCtrl
 * @description
 * # PagosRegistrarCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('PagosRegistrarCtrl', function ($scope, tiposservice, $uibModalInstance,
    serviciosservice, programacionesservice, $utilsViewService, pagosservice) {
    
    $scope.init = function() {
        $scope.loading = true;
        tiposservice.get(function(data) {
            $scope.tipos = data.tipos;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.onChangeTipo = function(tipo_id) {
        $scope.loading = true;
        serviciosservice.getByTipo({tipo_id: tipo_id}, function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });
    };
    
    $scope.onChangeServicio = function(servicio_id) {
        $scope.loading = true;
        programacionesservice.getByServicioNoPagados({servicio_id: servicio_id}, function(data) {
            $scope.loading = false;
            $scope.programaciones = data.programaciones;
        });
    };
    
    $scope.registrarPago = function(pago, boton) {
        $utilsViewService.disable('#' + boton);
        
        pagosservice.save(pago, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});