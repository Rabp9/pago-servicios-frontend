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
    $scope.recibos_pre_selected = [];
    $scope.recibos_ws = {
        wCheckbox: '1%',
        wCodigo: '5%',
        wTipo: '28%',
        wServicio: '29%',
        wDetalle: '13%',
        wFechaVencimiento: '14%',
        wMonto: '9%',
        wAcciones: '1%'
    };
    $scope.checkAll = {
        value: false
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
            $scope.count = data.count;
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
    
    $scope.sendToSelectedList = function() {
        angular.forEach($scope.recibos_pre_selected, function(p_value, p_key) {
            var seleccionar = true;
            angular.forEach($scope.recibos_selected, function(value, key) {
                if (value.id === p_value.id) {
                    seleccionar = false;
                }
            });
            if (seleccionar) {
                $scope.recibos_selected.push(p_value);
            }
        });
    };
    
    $scope.checkAllRecibos = function(checkAll) {
        if (checkAll.value) {
            $scope.recibos_pre_selected = $scope.recibos.slice();
            $('.chReciboPre').prop('checked', true);
        } else {
            $scope.recibos_pre_selected = [];
            $('.chReciboPre').prop('checked', false);
        }
    };
    
    $scope.removeReciboSelected = function(recibo_index) {
        var index = $scope.recibos_selected.indexOf(recibo_index);
        $scope.recibos_selected.splice(index, 1);
    };
    
    $scope.init();
});