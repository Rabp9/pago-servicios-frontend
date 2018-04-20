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
    $scope.page = 1;
    $scope.items_per_page = 10;

    $scope.init = function() {
        $scope.loading = true;
        $scope.getTipos();
    };
    
    $scope.getTipos = function() {
        $scope.loading = true;
        tiposservice.get({
            page: $scope.page,
            estado_id: $scope.search.estado_id,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.tipos = data.tipos;
            $scope.pagination = data.pagination;
            $scope.count = data.count;
            $scope.loading = false;
        });
    };
    
    $scope.$watch('search.estado_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getTipos();
    });
    
    $scope.pageChanged = function() {
        $scope.getTipos();
    };
    
    $scope.showTiposAdd = function() {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/tipos-add.html',
            controller: 'TiposAddCtrl',
            backdrop: false
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.getTipos();
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
                $scope.getTipos();
            }, function(error) {
                tipo.estado_id = 1;
            });
        }
    };
    
    $scope.showTiposActivate = function(tipo) {
        if (confirm('¿Está seguro de activar el Tipo de Servicio?')) {
            tipo.estado_id = 1;
            tiposservice.save(tipo, function(data) {
                $scope.message = data;
                $scope.getTipos();
            }, function(error) {
                tipo.estado_id = 2;
            });
        }
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getTipos();
    };
    
    $scope.init();
});