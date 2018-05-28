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
    
    $scope.search = {};
    $scope.search.text = '';
    $scope.page = 1;
    $scope.items_per_page = 10;

    $scope.init = function() {
        $scope.getUsers();
    };
    
    $scope.getUsers = function() {
        $scope.loading = true;
        usersservice.getAdmin({
            page: $scope.page,
            text: $scope.search.text,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.users = data.users;
            $scope.pagination = data.pagination;
            $scope.count = data.count;
            $scope.loading = false;
        });
    };
    
    $scope.$watch('search.text', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getUsers();
    });
    
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
            $scope.getUsers();
            $scope.message = data;
        });
    };
    
    $scope.pageChanged = function() {
        $scope.getUsers();
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getUsers();
    };
    
    $scope.init();
});