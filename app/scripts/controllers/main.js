'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('MainCtrl', function ($scope, $interval, serviciosservice) {
    $interval(function(){
        serviciosservice.getPendientesPago(function(data) {
            angular.forEach(data.servicios, function(value, key) {
                
            });
        });
    }, 3000);
});