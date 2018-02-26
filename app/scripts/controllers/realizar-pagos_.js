'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RealizarPagosCtrl
 * @description
 * # RealizarPagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RealizarPagosCtrl', function ($scope, recibosservice) {
    $scope.search = {};
    $scope.items_per_page_servicios = 10;
    $scope.recibos_ws = {
        wCodigo: '5%',
        wTipo: '29%',
        wServicio: '29%',
        wDetalle: '13%',
        wFechaVencimiento: '14%',
        wMonto: '10%'
    };

    $scope.init = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.search.fecha_inicio = firstDay;
        $scope.search.fecha_cierre = lastDay;
        $scope.fecha_pre = date;
    };
    
    $scope.showRecibos = function() {
        $scope.loading_recibos = true;
        recibosservice.get({
            text: $scope.search.text,
            fecha_inicio: $scope.search.fecha_inicio,
            fecha_cierre: $scope.fecha_cierre,
            page_recibos: $scope.page_recibos
        }, function(data) {
            $scope.recibos = data.recibos;
            $scope.loading_recibos = false;
        });
    };
    
    $scope.onChangeItemsPerPageServicios = function() {
        $scope.page_recibos = 1;
        $scope.showRecibos();
    };
    
    $scope.pageRecibosChanged = function() {
        $scope.showRecibos();
    };
    
    $scope.pagarRecibos = function() {
        
    };
    
    $scope.init();
});