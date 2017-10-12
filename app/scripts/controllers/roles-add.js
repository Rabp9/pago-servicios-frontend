'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RolesAddCtrl
 * @description
 * # RolesAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RolesAddCtrl', function ($scope, rolesservice, $uibModalInstance, 
controllersservice, $utilsViewService) {
    
    $scope.rol = {};
    $scope.rol.controller_roles = [];
    
    $scope.loading = true;
    controllersservice.get(function(data) {
        $scope.rol.controller_roles = [];
        angular.forEach(data.controllers, function(value, key) {
            $scope.rol.controller_roles.push({
                controller_id: value.id,
                controller: value,
                permiso: false
            });
        });
        $scope.loading = false;
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