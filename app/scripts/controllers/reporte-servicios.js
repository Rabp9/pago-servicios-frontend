'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteServiciosCtrl
 * @description
 * # ReporteServiciosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteServiciosCtrl', function ($scope, serviciosservice) {
    function formatDate(fecha) {
        if (fecha === undefined) {
            return undefined;
        }
        return fecha.getFullYear() + '-' + str_pad((fecha.getMonth() + 1), '00') + '-' + str_pad(fecha.getDate(), '00');
    }
    
    function str_pad(str, pad) {
        return pad.substring(0, (pad.length - str.toString().length)) + str;
    }
    
    $scope.search = {};
    $scope.search.condicion = '';
    $scope.loading = false;
    var today = new Date();
    $scope.today = formatDate(today);
    
    $scope.init = function() {
        $scope.loading = true;
        serviciosservice.getReport(function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });
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