'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('MainCtrl', function ($scope, recibosservice, $uibModal, $utilsViewService) {
    $scope.recibos_ws = {
       wCodigo: '6%',
       wFechaVencimiento: '16%',
       wFechaPago: '16%',
       wMonto: '10%',
       wNroRecibo: '21%',
       wNroDocumento: '12%',
       wAcciones: '19%'
    };
    $scope.labelsBar = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $scope.optionsBar = {legend: {display: true}};
    $scope.dataBar = [];
    
    $scope.optionsPie = {legend: {display: true, position: 'right'}};
    $scope.dataPie = [];
   
    $scope.init = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.fecha_inicio = $utilsViewService.formatDate(firstDay);
        $scope.fecha_cierre = $utilsViewService.formatDate(lastDay);
        $scope.getRecibos();
        $scope.getEstadisticas();
        var year = date.getFullYear();
        $scope.seriesBar = ['Pagado en soles (' + year + ')', 'Deuda en soles (' + year + ')'];
        $scope.labelsPie = ['Recibos no pagados (' + year + ')', 'Recibos Pagados (' + year + ')'];
        $scope.getChartBarData();
    };
    
    $scope.getRecibos = function() {
        $scope.loading_recibos = true;
        $scope.loading_recibos = true;
        recibosservice.get({
            estado_id: 4,
            fecha_inicio: $scope.fecha_inicio,
            fecha_cierre: $scope.fecha_cierre
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
            $scope.dataPie = [$scope.estadisticas.sinPagarCount, $scope.estadisticas.pagadosCount];
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
    
    $scope.getChartBarData = function() {
        $scope.loading_bar = true;
        var date = new Date();
        var year = date.getFullYear();
        recibosservice.getChartBarData({anio: year}, function(data) {
            $scope.dataBar.push(data.pagado_serie);
            $scope.dataBar.push(data.deuda_serie);
            $scope.loading_bar = false;
        });
    };
    
    $scope.init();
});