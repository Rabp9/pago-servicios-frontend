'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteTiposCtrl
 * @description
 * # ReporteTiposCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteTiposCtrl', function ($scope, tiposservice, $utilsViewService) {
    $scope.search = {};
    $scope.items_per_page = 10;
    $scope.page = 1;
    $scope.tipos_ws = {
       wCodigo: '5%',
       wDescripcion: '32%',
       wNServicios: '14%',
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
        $scope.getReporteTipos();
    };
    
    $scope.getReporteTipos = function() {
        $scope.loading = true;
        var fechaInicio = $utilsViewService.formatDate($scope.search.fechaInicio);
        var fechaCierre = $utilsViewService.formatDate($scope.search.fechaCierre);
        tiposservice.getReporte({
            fechaInicio: fechaInicio,
            fechaCierre: fechaCierre,
            page: $scope.page,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.tipos = data.tipos;
            var montoPendienteArray = [];
            angular.forEach($scope.tipos, function(val, key) {
                $scope.labelsBar.push(val.descripcion);
                montoPendienteArray.push(val.montoPendiente);
            });
            $scope.dataBar.push(montoPendienteArray);
            $scope.loading = false;
        });
    };
    
    $scope.onChangeItemsPerPage = function() {
        $scope.page = 1;
        $scope.getReporteTipos();
    };
    
    $scope.pageChanged = function() {
        $scope.getReporteTipos();
    };
    
    $scope.init();
});