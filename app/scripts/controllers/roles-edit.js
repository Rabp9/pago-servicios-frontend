'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RolesEditCtrl
 * @description
 * # RolesEditCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RolesEditCtrl', function ($scope, rol_id, $uibModalInstance, rolesservice, $utilsViewService) {
    rolesservice.get({id: rol_id}, function(data) {
        $scope.rol = data.rol;
    });

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $utilsViewService.disable('#' + boton);
        
        rolesservice.save(rol, function(data) {
            $uibModalInstance.close(data);
        }, function(err) {
            $uibModalInstance.close(err.data);
        });
    };
});