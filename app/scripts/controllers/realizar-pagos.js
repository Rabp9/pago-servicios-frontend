'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RealizarPagosCtrl
 * @description
 * # RealizarPagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RealizarPagosCtrl', function ($scope, recibosservice, $utilsViewService) {
    $scope.search = {};
    $scope.items_per_page_servicios = 10;
    $scope.recibos_selected = [];
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
        $scope.showRecibos();
    };
    
    $scope.showRecibos = function() {
        $scope.loading_recibos = true;
        var fecha_inicio = $utilsViewService.formatDate($scope.search.fecha_inicio);
        var fecha_cierre = $utilsViewService.formatDate($scope.search.fecha_cierre);
        recibosservice.get({
            text: $scope.search.text,
            fecha_inicio: fecha_inicio,
            fecha_cierre: fecha_cierre,
            page: $scope.page_recibos,
            items_per_page: $scope.items_per_page_servicios,
            estado_id: 4
        }, function(data) {
            $scope.recibos = data.recibos;
            $scope.pagination_recibos = data.pagination;
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
    
    $scope.pagarRecibos = function(recibos_selected, fecha_pre, nro_documento, boton) {
        $utilsViewService.disable('#' + boton);
        
        var fecha = '';
        if (fecha_pre !== null) {
            fecha = $utilsViewService.formatDate(fecha_pre);
        }
        
        recibosservice.pagarMany({
            recibos: recibos_selected,
            fecha: fecha,
            nro_documento: nro_documento
        }, function(data) {
            $scope.message = data;
            
            $scope.recibos_selected = [];
            var date = new Date();
            $scope.fecha_pre = date;
            $scope.nro_documento = '';
            $scope.showRecibos();
            $utilsViewService.enable('#' + boton);
        });
    };
    
    $scope.hideMe = function() {
        return $scope.recibos_selected.length > 0;
    };
    
    $scope.init();
});