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
    $scope.search.estado_id = '1';

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
            $scope.tipos.push(data.tipo);
        });
    };
    
    $scope.showTiposEdit = function(tipo) {
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/tipos-edit.html',
            controller: 'TiposEditCtrl',
            backdrop: false,
            resolve: {
                tipo_id: function() {
                    return tipo.id;
                } 
            }
        });

        modalInstanceEdit.result.then(function (data) {
            $scope.message = data;
            $scope.init();
        });
    };
    
    $scope.showTiposDelete = function(tipo) {
        if (confirm('¿Está seguro de deshabilitar el tipo?')) {
            tipo.estado_id = 2;
            tiposservice.save(tipo, function(data) {
                $scope.message = data;
            }, function(error) {
                tipo.estado_id = 1;
            });
        }
    };
    
    $scope.showTiposActivate = function(tipo) {
        if (confirm('¿Está seguro de activar el tipo?')) {
            tipo.estado_id = 1;
            tiposservice.save(tipo, function(data) {
                $scope.message = data;
            }, function(error) {
                tipo.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});