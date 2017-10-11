'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ServiciosCtrl
 * @description
 * # ServiciosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ServiciosCtrl', function ($scope, serviciosservice, $uibModal) {

    $scope.search = {};
    $scope.search.estado_id = '1';

    $scope.init = function() {
        $scope.loading = true;
        serviciosservice.get(function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });
    };
    
    $scope.showServiciosAdd = function() {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/servicios-add.html',
            controller: 'ServiciosAddCtrl',
            backdrop: false
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.servicios.push(data.servicio);
        });
    };
    
    $scope.showServiciosEdit = function(servicio) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/servicios-edit.html',
            controller: 'ServiciosEditCtrl',
            backdrop: false,
            resolve: {
                servicio_id: function() {
                    return servicio.id;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data;
            $scope.init();
        });
    };
    
    $scope.showServiciosDelete = function(servicio) {
        if (confirm('¿Está seguro de deshabilitar el servicio?')) {
            servicio.estado_id = 2;
            serviciosservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 1;
            });
        }
    };
    
    $scope.showServiciosActivate = function(servicio) {
        if (confirm('¿Está seguro de activar el servicio?')) {
            servicio.estado_id = 1;
            serviciosservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});