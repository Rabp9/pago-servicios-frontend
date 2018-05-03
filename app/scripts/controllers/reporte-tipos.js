'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteTiposCtrl
 * @description
 * # ReporteTiposCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteTiposCtrl', function ($scope, tiposservice) {
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
        tiposservice.getReporte({
            fechaInicio: $scope.search.fechaInicio,
            fechaCierre: $scope.search.fechaCierre,
            page: $scope.page,
            items_per_page: $scope.items_per_page
        }, function(data) {
            $scope.tipos = data.tipos;
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