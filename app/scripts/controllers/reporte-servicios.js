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
    $scope.search = {};
    $scope.search.condicion = "";
    $scope.loading = false;
    
    $scope.init = function() {
        $scope.loading = true;
        serviciosservice.getReport(function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });
    };
    
    $scope.exportData = function (option) {
        var cargando = $( "#trCargando" ).detach();
        var no_hay_registros = $( "#trNoHayRegistros" ).detach();

        $('#exportable').tableExport({ type: option, escape: false });
        
        cargando.appendTo("#exportable tbody");
        no_hay_registros.appendTo("#exportable tbody");
        
        no_hay_registros = null;
        cargando = null;
    };
    
    $scope.init();
});