'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ServiciosEditCtrl
 * @description
 * # ServiciosEditCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ServiciosEditCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, serviciosservice, tiposservice, servicio_id, $q) {

    $scope.init = function() {
        $scope.loading = true;
        
        $q.all([
            serviciosservice.get({id: servicio_id}).$promise,
            tiposservice.get().$promise
        ]).then(function(data) {
            $scope.servicio = data[0].servicio;
            $scope.tipos = data[1].tipos;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveServicio = function(servicio, boton) {
        $utilsViewService.disable('#' + boton);
        
        delete servicio.tipo;
        serviciosservice.save(servicio, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});