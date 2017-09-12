'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:TiposAddCtrl
 * @description
 * # TiposAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('TiposAddCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, tiposservice) {

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
});