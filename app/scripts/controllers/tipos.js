'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:TiposCtrl
 * @description
 * # TiposCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('TiposCtrl', function ($scope, tiposservice, $uibModal) {

    $scope.search = {};
    $scope.search.estado_id = "";

    $scope.init = function() {
        $scope.loading = true;
        tiposservice.get(function(data) {
            $scope.tipos = data.tipos;
            $scope.loading = false;
        });
    };
    
    $scope.showTiposAdd = function() {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/tipos-add.html',
            controller: 'TiposAddCtrl',
            backdrop: false
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.tipos.push(data.servicio);
        });
    };
    
    $scope.showTiposEdit = function(servicio) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/tipos-edit.html',
            controller: 'TiposEditCtrl',
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
    
    $scope.showTiposDelete = function(servicio) {
        if (confirm('¿Está seguro de deshabilitar el servicio?')) {
            servicio.estado_id = 2;
            tiposservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 1;
            });
        }
    };
    
    $scope.showTiposActivate = function(servicio) {
        if (confirm('¿Está seguro de activar el servicio?')) {
            servicio.estado_id = 1;
            tiposservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});