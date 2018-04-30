'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteTiposCtrl
 * @description
 * # ReporteTiposCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteTiposCtrl', function ($scope) {
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
});