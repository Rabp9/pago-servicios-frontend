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
        
    $scope.loading = true;
    $scope.rol_user = {};
    
    usersservice.get({id: user_id}, function(data) {
        $scope.user = data.user;
        $scope.rol_user.user_id = data.user.PerCod;
    });
    
    rolesservice.get(function(data) {
        $scope.roles = data.roles;
        $scope.loading = false;
    });
    
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
});