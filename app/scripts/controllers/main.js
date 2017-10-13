'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('MainCtrl', function ($scope, serviciosservice) {
    $scope.bgcolor = 'btn-success';
    
    $scope.init = function() {
        serviciosservice.getReport(function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });  
    };
      
    $scope.getBgColor = function() {
        if ($scope.bgcolor === 'btn-success') {
            $scope.bgcolor = 'btn-primary';
            return $scope.bgcolor;
        }
        if ($scope.bgcolor === 'btn-primary') {
            $scope.bgcolor = 'btn-danger';
            return $scope.bgcolor;
        }
        if ($scope.bgcolor === 'btn-danger') {
            $scope.bgcolor = 'btn-warning';
            return $scope.bgcolor;
        }
        if ($scope.bgcolor === 'btn-warning') {
            $scope.bgcolor = 'btn-info';
            return $scope.bgcolor;
        }
        if ($scope.bgcolor === 'btn-info') {
            $scope.bgcolor = 'btn-success';
            return $scope.bgcolor;
        }
    };
    
    $scope.init();
});