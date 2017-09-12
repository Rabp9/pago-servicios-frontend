'use strict';

/**
 * @ngdoc function
 * @name pagoTiposFrontendApp.controller:TiposEditCtrl
 * @description
 * # TiposEditCtrl
 * Controller of the pagoTiposFrontendApp
 */
angular.module('pagoTiposFrontendApp')
.controller('TiposEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, tiposservice, tipo_id) {

    $scope.init = function() {
        tiposservice.get({id: tipo_id}, function(data) {
            $scope.tipo = data.tipo;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveTipo = function(tipo, boton) {
        $utilsViewService.disable('#' + boton);
        
        tiposservice.save(tipo, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});