'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('MainCtrl', function ($scope, recibosservice, $uibModal) {
    $scope.recibos_ws = {
       wCodigo: '6%',
       wFechaVencimiento: '16%',
       wFechaPago: '16%',
       wMonto: '10%',
       wNroRecibo: '21%',
       wNroDocumento: '12%',
       wAcciones: '19%'
    };
    
    $scope.init = function() {
        var date = new Date();
        $scope.fecha_inicio = new Date(date.getFullYear(), date.getMonth(), 1);
        $scope.fecha_cierre = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.getRecibos();
        $scope.getEstadisticas();
    };
    
    $scope.getRecibos = function() {
        $scope.loading_recibos = true;
        $scope.loading_recibos = true;
        recibosservice.get({
            estado_id: 4,
            fecha_inicio: $scope.fecha_inicio,
            fecha_cierre: $scope.fecha_cierre,
        }, function(data) {
            $scope.recibos = data.recibos;
            $scope.loading_recibos = false;
        });
    };
    
    $scope.getEstadisticas = function() {
        $scope.loading_estadisticas = true;
        recibosservice.getEstadisticas({
            fecha_inicio: $scope.fecha_inicio,
            fecha_cierre: $scope.fecha_cierre,
        }, function(data) {
            $scope.estadisticas = data;
            $scope.loading_estadisticas = false;
        });
    };
    
    $scope.showRecibosDelete = function(recibo) {
        if (confirm('¿Está seguro de eliminar la recibo?')) {
            recibo.estado_id = 2;
            recibosservice.save(recibo, function(data) {
                $scope.message = data;
            }, function(error) {
                recibo.estado_id = 3;
            });
        }
    };
    
    $scope.showRecibosEdit = function(recibo) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/recibos-edit.html',
            controller: 'RecibosEditCtrl',
            backdrop: false,
            resolve: {
                recibo: function() {
                    return recibo;
                }
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.getRecibos();
        });
    };
    
    $scope.showRecibosPagar = function(recibo) {
        var modalInstancePagar = $uibModal.open({
            templateUrl: 'views/recibos-pagar.html',
            controller: 'RecibosPagarCtrl',
            backdrop: false,
            resolve: {
                recibo: function() {
                    return recibo;
                }
            }
        });

        modalInstancePagar.result.then(function (data) {
            $scope.message = data;
            $scope.getRecibos();
        });
    };
    
    $scope.init();
});