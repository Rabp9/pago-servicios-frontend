'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('UsersCtrl', function ($scope, usersservice, $uibModal, $utilsViewService) {
    $scope.loading = true;
    
    function getUsers() {
        $scope.loading = true;
        usersservice.getAdmin(function(data) {
            $scope.users = data.users;
            $scope.loading = false;
        });
    }
    
    getUsers();
    
    $scope.showUsersEdit = function(user_id, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/users-edit.html',
            controller: 'UsersEditCtrl',
            backdrop: false,
            resolve: {
                user_id: function() {
                    return user_id;
                }
            }
        });
        
        $utilsViewService.enable(event.currentTarget);
        modalInstanceEdit.result.then(function (data) {
            getUsers();
            $scope.message = data;
        });
    };
});