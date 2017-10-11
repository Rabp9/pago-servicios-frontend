'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:ProgramacionesCtrl
 * @description
 * # ProgramacionesCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('ProgramacionesCtrl', function ($scope, serviciosservice, programacionesservice,
    $uibModal, tiposservice) {
    
    $scope.search = {};
    $scope.search.estado_id = '';
    
    $scope.init = function() {
        tiposservice.get(function(data) {
            $scope.tipos = data.tipos;
        });
    };
    
    $scope.onChangeTipo = function(tipo_id) {
        $scope.loading = true;
        serviciosservice.getByTipo({tipo_id: tipo_id}, function(data) {
            $scope.loading = false;
            $scope.servicios = data.servicios;
        });
    };
    
    $scope.onChangeServicio = function(servicio_id) {
        $scope.loading = true;
        programacionesservice.getByServicio({servicio_id: servicio_id}, function(data) {
            $scope.loading = false;
            $scope.programaciones = data.programaciones;
        });
    };
    
    $scope.showProgramacionesAdd = function(servicio, tipo) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/programaciones-add.html',
            controller: 'ProgramacionesAddCtrl',
            backdrop: false,
            resolve: {
                servicio: function() {
                    return servicio;
                },
                tipo: function() {
                    return tipo;
                },
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.programaciones.push(data.programacion);
        });
    };
    
    $scope.showProgramacionesCancelar = function(programacion) {
        if (confirm('¿Está seguro de cancelar el pago?')) {
            programacion.estado_id = 4;
            programacionesservice.save(programacion, function(data) {
                $scope.message = data;
            }, function(error) {
                programacion.estado_id = 3;
            });
        }
    };
    
    $scope.showProgramacionesDelete = function(programacion) {
        if (confirm('¿Está seguro de eliminar la programación?')) {
            programacion.estado_id = 2;
            programacionesservice.save(programacion, function(data) {
                $scope.message = data;
            }, function(error) {
                programacion.estado_id = 3;
            });
        }
    };
    
    $scope.showProgramacionesActivate = function(programacion) {
        if (confirm('¿Está seguro de activar la programación?')) {
            programacion.estado_id = 4;
            programacionesservice.save(programacion, function(data) {
                $scope.message = data;
            }, function(error) {
                programacion.estado_id = 3;
            });
        }
    };
    
    $scope.showProgramacionesEdit = function(programacion, servicio) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/programaciones-edit.html',
            controller: 'ProgramacionesEditCtrl',
            backdrop: false,
            resolve: {
                programacion: function() {
                    return programacion;
                }
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.onChangeServicio($scope.servicio.id);
        });
    };
    
    $scope.init();
});