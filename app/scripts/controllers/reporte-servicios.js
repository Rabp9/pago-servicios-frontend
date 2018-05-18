'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteServiciosCtrl
 * @description
 * # ReporteServiciosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteServiciosCtrl', function ($scope, serviciosservice, tiposservice, $utilsViewService) {
    $scope.search = {};
    $scope.items_per_page = 10;
    $scope.page = 1;
    $scope.tipos_ws = {
       wCodigo: '5%',
       wDescripcion: '32%',
       wDetalle: '14%',
       wNRecibos: '14%',
       wNRecibosSinPagar: '14%',
       wMontoPendiente: '21%',
    };
    $scope.labelsBar = [];
    $scope.seriesBar = ['Monto Total Pendiente de Pago'];
    $scope.optionsBar = {legend: {display: true}};
    $scope.dataBar = [];
   
    $scope.init = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.search.fechaInicio = firstDay;
        $scope.search.fechaCierre = lastDay;
        $scope.loading_tipos = 'Cargando...';
        tiposservice.get(function(data) {
            $scope.loading_tipos = 'Selecciona un Tipo';
            $scope.tipos = data.tipos;
        });
    };
    
    $scope.onChangeTipo = function(tipo_id) {
        if (tipo_id === undefined) {
            tipo_id = 0;
        }
        $scope.getReporteServicios(tipo_id);
    };
    
    $scope.getReporteServicios = function(tipo_id) {
        $scope.loading = true;
        var fechaInicio = $utilsViewService.formatDate($scope.search.fechaInicio);
        var fechaCierre = $utilsViewService.formatDate($scope.search.fechaCierre);
        $scope.labelsBar = [];
        $scope.dataBar = [];
        serviciosservice.getReporte({
            tipo_id: tipo_id,
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            page: $scope.page,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.servicios = data.servicios;
            var montoPendienteArray = [];
            angular.forEach($scope.servicios, function(val, key) {
                $scope.labelsBar.push(val.descripcion);
                montoPendienteArray.push(val.montoPendiente);
            });
            $scope.dataBar.push(montoPendienteArray);
            $scope.loading = false;
        });
    };
    
    $scope.onChangeItemsPerPage = function(tipo_id) {
        $scope.page = 1;
        $scope.getReporteServicios(tipo_id);
    };
    
    $scope.pageChanged = function(tipo_id) {
        $scope.getReporteServicios(tipo_id);
    };
    
    $scope.exportData = function (option) {
        var cargando = $( '#trCargando' ).detach();
        var no_hay_registros = $( '#trNoHayRegistros' ).detach();

        $('#exportable').tableExport({ type: option, escape: false });
        
        cargando.appendTo('#exportable tbody');
        no_hay_registros.appendTo('#exportable tbody');
        
        no_hay_registros = null;
        cargando = null;
    };
    
    $scope.init();
});