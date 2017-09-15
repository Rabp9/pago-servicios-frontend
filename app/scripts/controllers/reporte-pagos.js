'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ReportePagosCtrl
 * @description
 * # ReportePagosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ReportePagosCtrl', function ($scope, pagosservice) {
    $scope.loading = false;
    
    $scope.changeDates = function(fecha_inicio, fecha_cierre) {
        $scope.loading = true;
        pagosservice.getByDates({
            fecha_inicio: formatDate(fecha_inicio), 
            fecha_cierre: formatDate(fecha_cierre)
        }, function(data) {
            $scope.pagos = data.pagos;
            $scope.loading = false;
        });
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
    
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
});