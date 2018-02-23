'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReporteRecibosCtrl
 * @description
 * # ReporteRecibosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReporteRecibosCtrl', function ($scope, recibosservice) {
    $scope.loading = false;
    
    $scope.changeDates = function(fecha_inicio, fecha_cierre) {
        if (fecha_inicio === undefined || fecha_cierre === undefined) {
            return;
        } else {
            $scope.loading = true;
            recibosservice.getByDates({
                fecha_inicio: formatDate(fecha_inicio), 
                fecha_cierre: formatDate(fecha_cierre)
            }, function(data) {
                $scope.recibos = data.recibos;
                $scope.loading = false;
            });
        }
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
    
    function formatDate(fecha) {
        if (fecha === undefined) {
            return undefined;
        }
        return fecha.getFullYear() + '-' + str_pad((fecha.getMonth() + 1), '00') + '-' + str_pad(fecha.getDate(), '00');
    }
    
    function str_pad(str, pad) {
        return pad.substring(0, (pad.length - str.toString().length)) + str;
    }
});