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
    $uibModal) {
    
    $scope.wCheckBox = '1%';
    $scope.wCodigo = '4%';
    $scope.wFechaVencimiento = '18%';
    $scope.wFechaPago = '18%';
    $scope.wMonto = '14%';
    $scope.wNroRecibo = '22%';
    $scope.wAcciones = '23%';
    
    $scope.search = {};
    $scope.search.servicio_estado_id = 1;
    $scope.search.programacion_estado_id = 4;
    $scope.search.servicio_text = '';
    $scope.selected = {};
    $scope.selected.servicio_id = '';
    $scope.page_servicios = 1;
    $scope.page_programaciones = 1;
    $scope.programaciones_selected = [];
    $scope.items_per_page_programaciones = 10;
    $scope.items_per_page_servicios = 10;
    $scope.check_all_list = {
        value: false
    };
    
    $scope.init = function() {
        $scope.getServicios();
    };
    
    $scope.getServicios = function() {
        $scope.loading_servicios = true;
        serviciosservice.get({
            page: $scope.page_servicios,
            estado_id: $scope.search.servicio_estado_id,
            text: $scope.search.servicio_text,
            items_per_page: $scope.items_per_page_servicios
        }, function(data) {
            $scope.servicios = data.servicios;
            $scope.pagination_servicios = data.pagination;
            $scope.loading_servicios = false;
        });
    };
    
    $scope.pageServiciosChanged = function() {
        $scope.getServicios();
    };
    
    $scope.pageServiciosProgramaciones = function() {
        $scope.getProgramaciones();
    };
    
    $scope.getProgramaciones = function() {
        if ($scope.selected.servicio_id === '') {
            return;
        }
        $scope.programaciones = [];
        $scope.programaciones_selected.length = 0;
        $scope.check_all_list.value = false;
        $scope.loading_programaciones = true;
        programacionesservice.get({
            servicio_id: $scope.selected.servicio_id,
            page: $scope.page_programaciones,
            estado_id: $scope.search.estado_id,
            items_per_page: $scope.items_per_page_programaciones
        }, function(data) {
            $scope.programaciones = data.programaciones;
            $scope.loading_programaciones = false;
            $scope.pagination_programaciones = data.pagination;
        });
    };
    
    $scope.$watch('search.servicio_estado_id', function(oldValue, newValue) {
        $scope.page = 1;
        $scope.getServicios();
    });
        
    $scope.$watch('search.servicio_text', function(oldValue, newValue) {
        $scope.page_servicios = 1;
        $scope.getServicios();
    });
    
    $scope.$watch('selected.servicio_id', function(oldValue, newValue) {
        $scope.page_programaciones = 1;
        $scope.getProgramaciones();
    });
    
    $scope.showProgramacionesAdd = function(selected) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/programaciones-add.html',
            controller: 'ProgramacionesAddCtrl',
            backdrop: false,
            resolve: {
                servicio_id: function() {
                    return selected.servicio_id;
                }
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.getProgramaciones();
        });
    };
    
    $scope.showProgramacionesCancelar = function(programacion) {
        if (confirm('¿Está seguro de cancelar el pago?')) {
            programacion.estado_id = 4;
            programacion.fecha_pago = null;
            programacion.nro_documento = null;
            programacionesservice.cancelarPago(programacion, function(data) {
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
    
    $scope.showProgramacionesEdit = function(programacion) {
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
    
    $scope.showProgramacionesPagar = function(programacion) {
        var modalInstancePagar = $uibModal.open({
            templateUrl: 'views/programaciones-pagar.html',
            controller: 'ProgramacionesPagarCtrl',
            backdrop: false,
            resolve: {
                programacion: function() {
                    return programacion;
                }
            }
        });

        modalInstancePagar.result.then(function (data) {
            $scope.message = data;
            $scope.getProgramaciones();
        });
    };
    
    
    $scope.showProgramacionesPagarMany = function(programaciones_id) {
        var modalInstancePagar = $uibModal.open({
            templateUrl: 'views/programaciones-pagar-many.html',
            controller: 'ProgramacionesPagarManyCtrl',
            backdrop: false,
            resolve: {
                programaciones_id: function() {
                    return programaciones_id;
                }
            }
        });

        modalInstancePagar.result.then(function (data) {
            $scope.message = data;
            $scope.getProgramaciones();
        });
    };
    
    $scope.check_all_list_event = function() {
        if ($scope.check_all_list.value) {
            angular.forEach($scope.programaciones, function(value, key) {
                if ($scope.programaciones_selected.indexOf(value.id) === -1) {
                    $scope.programaciones_selected.push(value.id);
                }
            });
        } else {
            $scope.programaciones_selected.length = 0;
        }
    };
    
    $scope.onChangeItemsPerPageServicios = function() {
        $scope.page_servicios = 1;
        $scope.getServicios();
    };
    
    $scope.onChangeItemsPerPageProgramaciones = function() {
        $scope.page_programaciones = 1;
        $scope.getProgramaciones();
    };
    
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