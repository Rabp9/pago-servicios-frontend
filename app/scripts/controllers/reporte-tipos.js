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
    $scope.tipos = [
        {
            id: 1,
            descripcion: 'desc 1',
            countServicios: 10,
            countRecibos: 30,
            countRecibosPendientes: 15,
            montoPendiente: 300.50
        },
        {
            id: 1,
            descripcion: 'desc 1',
            countServicios: 10,
            countRecibos: 30,
            countRecibosPendientes: 0,
            montoPendiente: 300.50
        },
        {
            id: 1,
            descripcion: 'desc 1',
            countServicios: 10,
            countRecibos: 30,
            countRecibosPendientes: 5,
            montoPendiente: 300.50
        },
        {
            id: 1,
            descripcion: 'desc 1',
            countServicios: 10,
            countRecibos: 30,
            countRecibosPendientes: 15,
            montoPendiente: 300.50
        },
        {
            id: 1,
            descripcion: 'desc 1',
            countServicios: 10,
            countRecibos: 30,
            countRecibosPendientes: 0,
            montoPendiente: 300.50
        }
    ];

    $scope.init = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.search.fechaInicio = firstDay;
        $scope.search.fechaCierre = lastDay;
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