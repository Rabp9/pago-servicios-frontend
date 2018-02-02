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
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveProgramacion = function(programacion, boton) {
        $utilsViewService.disable('#' + boton);
        
        if ($scope.chMesesPosteriores) {
            var programaciones = [];
            
            var begin_year = $scope.fecha_pre.getFullYear();
            var begin_month = $scope.fecha_pre.getMonth() + 1;
            var begin_day = $scope.fecha_pre.getDate();
            var final_year = $scope.fecha_pre_ultimo.getFullYear();
            var final_month = $scope.fecha_pre_ultimo.getMonth() + 1;
            var final_day = $scope.fecha_pre_ultimo.getDate();
            
            var begin_date = begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + "-" + str_pad(begin_day.toString(), '00');
            var final_date = final_year.toString() + '-' + str_pad(final_month.toString(), '00') + "-" + str_pad(final_day.toString(), '00');
            
            console.log('begin_date: ' + begin_date);
            console.log('final_date: ' + final_date);
            
            while (begin_date <= final_date) {
                if (begin_day === 31 && (begin_month === 4 || begin_month === 6 || begin_month === 9 || begin_month === 11)) {
                    var programacion = {
                        fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + "-" + '30',
                        estado_id: 4,
                    };
                } else if (begin_month === 2) {
                    
                } else {
                    var programacion = {
                        fecha_vencimiento: begin_date,
                        estado_id: 4,
                    };
                }
                programaciones.push(programacion);
                if (begin_month !== 12) {
                    begin_month += 1;
                } else {
                    begin_month = 1;
                    begin_year += 1;
                }
                begin_date = begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + "-" + str_pad(begin_day.toString(), '00');
                final_date = final_year.toString() + '-' + str_pad(final_month.toString(), '00') + "-" + str_pad(final_day.toString(), '00');
            }
            console.log(programaciones);
            
        } else {
            if ($scope.fecha_pre !== null) {
                programacion.fecha_vencimiento = formatDate($scope.fecha_pre);
            }
            programacion.estado_id = 4;
            programacionesservice.save(programacion, function (data) {
                $uibModalInstance.close(data);
            }, function (err) {
                $uibModalInstance.close(err.data);
            });
        }
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
    
    $scope.init();
});