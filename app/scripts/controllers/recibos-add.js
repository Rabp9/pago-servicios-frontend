'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RecibosAddCtrl
 * @description
 * # RecibosAddCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RecibosAddCtrl', function ($scope, $uibModalInstance, 
    $utilsViewService, recibosservice, servicio_id, serviciosservice) {
 
    $scope.recibo = {};
    $scope.recibo.monto = 0;
    $scope.recibo.servicio_id = servicio_id;
    $scope.recibo.dias_mensaje = 5;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    $scope.saveRecibo = function(recibo, boton) {
        $utilsViewService.disable('#' + boton);
        
        if ($scope.chMesesPosteriores) {
            if ($scope.fecha_pre_ultimo === null) {
                alert('Ingrese una fecha');
                $utilsViewService.enable('#' + boton);
                return;
            }
            if ($scope.fecha_pre_ultimo < $scope.fecha_pre) {
                alert('Ingrese una fecha posterior para los meses posteriores');
                $utilsViewService.enable('#' + boton);
                return;
            }
            var recibos = [];
            
            var begin_year = $scope.fecha_pre.getFullYear();
            var begin_month = $scope.fecha_pre.getMonth() + 1;
            var begin_day = $scope.fecha_pre.getDate();
            var final_year = $scope.fecha_pre_ultimo.getFullYear();
            var final_month = $scope.fecha_pre_ultimo.getMonth() + 1;
            var final_day = $scope.fecha_pre_ultimo.getDate();
            
            var begin_date = begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + str_pad(begin_day.toString(), '00');
            var final_date = final_year.toString() + '-' + str_pad(final_month.toString(), '00') + '-' + str_pad(final_day.toString(), '00');
                        
            while (begin_date <= final_date) {
                var recibo_aux = {};
                if (begin_day === 31 && (begin_month === 4 || begin_month === 6 || begin_month === 9 || begin_month === 11)) {
                    recibo_aux = {
                        fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + '30',
                        estado_id: 4,
                        servicio: recibo.servicio,
                        monto: recibo.monto,
                        dias_mensaje: recibo.dias_mensaje,
                        nro_recibo: recibo.nro_recibo
                    };
                } else if (begin_month === 2) {
                    if ((begin_year % 4 === 0) && ((begin_year % 100 !== 0) || (begin_year % 400 === 0))) {
                        // es bisiesto
                        if (begin_day === 31 || begin_day === 30) {
                            recibo_aux = {
                                fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + '29',
                                estado_id: 4,
                                servicio: recibo.servicio,
                                monto: recibo.monto,
                                dias_mensaje: recibo.dias_mensaje,
                                nro_recibo: recibo.nro_recibo
                            };
                        } else {
                            recibo_aux = {
                                fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + str_pad(begin_day.toString(), '00'),
                                estado_id: 4,
                                servicio: recibo.servicio,
                                monto: recibo.monto,
                                dias_mensaje: recibo.dias_mensaje,
                                nro_recibo: recibo.nro_recibo
                            };
                        }
                    } else {
                        if (begin_day === 31 || begin_day === 30 || begin_day === 29) {
                            recibo_aux = {
                                fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + '28',
                                estado_id: 4,
                                servicio: recibo.servicio,
                                monto: recibo.monto,
                                dias_mensaje: recibo.dias_mensaje,
                                nro_recibo: recibo.nro_recibo
                            };
                        } else {
                            recibo_aux = {
                                fecha_vencimiento: begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + str_pad(begin_day.toString(), '00'),
                                estado_id: 4,
                                servicio: recibo.servicio,
                                monto: recibo.monto,
                                dias_mensaje: recibo.dias_mensaje,
                                nro_recibo: recibo.nro_recibo
                            };
                        }
                    }
                } else {
                    recibo_aux = {
                        fecha_vencimiento: begin_date,
                        estado_id: 4,
                        servicio: recibo.servicio,
                        monto: recibo.monto,
                        dias_mensaje: recibo.dias_mensaje,
                        nro_recibo: recibo.nro_recibo
                    };
                }
                recibos.push(recibo_aux);
                if (begin_month !== 12) {
                    begin_month += 1;
                } else {
                    begin_month = 1;
                    begin_year += 1;
                }
                begin_date = begin_year.toString() + '-' + str_pad(begin_month.toString(), '00') + '-' + str_pad(begin_day.toString(), '00');
                final_date = final_year.toString() + '-' + str_pad(final_month.toString(), '00') + '-' + str_pad(final_day.toString(), '00');
                recibo.monto = 0;
                recibo.nro_recibo = null;
            }
            recibosservice.saveMany({recibos: recibos}, function(data) {
                $uibModalInstance.close(data);
            }, function (err) {
                $uibModalInstance.close(err.data);
            });
        } else {
            if ($scope.fecha_pre !== null) {
                recibo.fecha_vencimiento = formatDate($scope.fecha_pre);
            }
            recibo.estado_id = 4;
            recibosservice.save(recibo, function (data) {
                $uibModalInstance.close(data);
            }, function (err) {
                $uibModalInstance.close(err.data);
            });
        }
    };
    
    $scope.init = function() {
        serviciosservice.get({id: $scope.recibo.servicio_id}, function(data) {
            $scope.recibo.servicio = data.servicio;
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