'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RolesCtrl', function ($scope, rolesservice, $uibModal, $utilsViewService) {
    $scope.loading = true;
    
    function getRoles() {    
        $scope.loading = true;
        rolesservice.get(function(data) {
            $scope.roles = data.roles;
            $scope.loading = false;
        });
    }
    
    getRoles();
    
    $scope.showRolesAdd = function(event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/roles-add.html',
            controller: 'RolesAddCtrl',
            backdrop: false
        });
        
        $utilsViewService.enable(event.currentTarget);
        modalInstanceAdd.result.then(function (data) {
            getRoles();
            $scope.message = data;
        });
    };
    
    $scope.showRolesEdit = function(rol_id, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/roles-edit.html',
            controller: 'RolesEditCtrl',
            backdrop: false,
            resolve: {
                rol_id: function() {
                    return rol_id;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        modalInstanceEdit.result.then(function (data) {
            getRoles();
            $scope.message = data;
        });
    };
});