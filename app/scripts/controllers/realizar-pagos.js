'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RealizarPagosCtrl
 * @description
 * # RealizarPagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RealizarPagosCtrl', function ($scope) {
    $scope.table1 = [
        {
            title: 'dsadsa',
            contenido: 'dasdsa'
        }, {
            title: 'dsadsa',
            contenido: 'dasdsa'
        }, {
            title: 'dsadsa',
            contenido: 'dasdsa'
        }
    ];
    
    $scope.table2 = [];

    $scope.hideMe = function() {
        return $scope.list4.length > 0;
    };
});