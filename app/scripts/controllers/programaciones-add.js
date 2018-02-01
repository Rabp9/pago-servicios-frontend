'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesAddCtrl
 * @description
 * # ProgramacionesAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesAddCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, programacionesservice, servicio_id, serviciosservice) {
 
    $scope.programacion = {};
    $scope.programacion.monto = 0;
    $scope.programacion.servicio_id = servicio_id;
    $scope.programacion.dias_mensaje = 5;
    
    $scope.search = {};
    $scope.search.servicio_id = '';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacion = function(programacion, boton) {
        $utilsViewService.disable('#' + boton);
        
        if ($scope.fecha_pre !== null) {
            programacion.fecha_vencimiento = formatDate($scope.fecha_pre);
        }
        programacion.estado_id = 4;
        programacionesservice.save(programacion, function (data) {
            $uibModalInstance.close(data);
        }, function (err) {
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init = function() {
        serviciosservice.get({id: $scope.programacion.servicio_id}, function(data) {
            $scope.programacion.servicio = data.servicio;
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
    
    $scope.$watch('search.servicio_id', function(oldValue, newValue) {
        $scope.loading_search = true;
        serviciosservice.get({id: $scope.search.servicio_id}, function(data) {
            $scope.programacion.servicio = data.servicio;
            $scope.loading_search = false;
        });
    });
    
    $scope.refreshServicios = function(servicio) {
        if (servicio !== '') {
            serviciosservice.searchMany({search: servicio}, function(data) {
                $scope.servicios = data.servicios;
            });
        }
    };
  
    $scope.setSelectServicioFocus = function() {
        $scope.$broadcast('UiSelectServicios');
    };
    
    $scope.init();
});