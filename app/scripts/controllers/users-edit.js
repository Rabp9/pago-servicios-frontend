'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:UsersEditCtrl
 * @description
 * # UsersEditCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('UsersEditCtrl', function ($scope, user_id, $uibModalInstance, usersservice, 
    rolesservice, $utilsViewService, rolusersservice) {
        
    $scope.rol_user = {};
    
    $scope.init = function() {
        $scope.getRoles();
        $scope.getUsers(user_id);
    };
    
    $scope.getUsers = function() {
        $scope.loading = true;
        usersservice.get({id: user_id}, function(data) {
            $scope.user_edit = data.user;
            if ($scope.user_edit.rol_user) {
                $scope.rol_user.id = data.user.rol_user.id;
                $scope.rol_user.rol_id = data.user.rol_user.rol_id;
            }
            $scope.rol_user.user_id = data.user.PerCod;
            $scope.loading = false;
        });
    };
    
    $scope.getRoles = function() {
        $scope.loading_roles = "Cargando...";
        rolesservice.getAdmin(function(data) {
            $scope.roles = data.roles;
            $scope.loading_roles = "Selecciona un Rol";
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRolUser = function(rol_user, boton) {
        $utilsViewService.disable('#' + boton);
        rolusersservice.save(rol_user, function(data) {
            $uibModalInstance.close(data);
        }, function(err) {
            $uibModalInstance.close(err.data); 
        });
    };
    
    $scope.init();
});