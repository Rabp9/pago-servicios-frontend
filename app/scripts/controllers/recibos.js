'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:RecibosCtrl
 * @description
 * # RecibosCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('RecibosCtrl', function ($scope, serviciosservice, recibosservice,
    $uibModal, tiposservice, $utilsViewService, $rootScope, $base64) {
    
    $scope.servicios_ws = {
       wCheckbox: '6%',
       wCodigo: '8%',
       wDescripcion: '34%',
       wTipo: '32%',
       wDetalle: '20%'
   };
    
    $scope.recibos_ws = {
       wCodigo: '6%',
       wFechaVencimiento: '16%',
       wFechaPago: '16%',
       wMonto: '10%',
       wNroRecibo: '21%',
       wNroDocumento: '12%',
       wAcciones: '19%'
    };
    
    $scope.search = {};
    $scope.search.servicio_estado_id = 1;
    $scope.search.recibo_estado_id = 4;
    $scope.search.servicio_text = '';
    $scope.selected = {};
    $scope.selected.servicio_id = '';
    $scope.page_servicios = 1;
    $scope.page_recibos = 1;
    $scope.items_per_page_recibos = 10;
    $scope.items_per_page_servicios = 10;
    $scope.check_all_list = {
        value: false
    };
    
    $scope.init = function() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.search.fecha_inicio = firstDay;
        $scope.search.fecha_cierre = lastDay;
        $scope.getTipos();
        $scope.getServicios();
    };
    
    $scope.getTipos = function() {
        $scope.loading_tipos = 'Cargando...';
        tiposservice.get(function(data) {
            $scope.loading_tipos = 'Selecciona un Tipo de Servicio';
            $scope.tipos = data.tipos;
        });  
    };
    
    $scope.getServicios = function() {
        $scope.loading_servicios = true;
        serviciosservice.get({
            page: $scope.page_servicios,
            estado_id: $scope.search.servicio_estado_id,
            text: $scope.search.servicio_text,
            items_per_page: $scope.items_per_page_servicios,
            tipo_id: $scope.tipo_id
        }, function(data) {
            $scope.servicios = data.servicios;
            $scope.pagination_servicios = data.pagination;
            $scope.count_servicios = data.count;
            $scope.loading_servicios = false;
        });
    };
    
    $scope.pageServiciosChanged = function() {
        $scope.getServicios();
    };
    
    $scope.pageRecibosChanged = function() {
        $scope.getRecibos();
    };
    
    $scope.pageServiciosRecibos = function() {
        $scope.getRecibos();
    };
    
    $scope.getRecibos = function() {
        if ($scope.selected.servicio_id === '') {
            return;
        }
        $scope.recibos = [];
        $scope.loading_recibos = true;
        var fecha_inicio = $utilsViewService.formatDate($scope.search.fecha_inicio);
        var fecha_cierre = $utilsViewService.formatDate($scope.search.fecha_cierre);
        recibosservice.get({
            servicio_id: $scope.selected.servicio_id,
            page: $scope.page_recibos,
            estado_id: $scope.search.recibo_estado_id,
            fecha_inicio: fecha_inicio,
            fecha_cierre: fecha_cierre,
            items_per_page: $scope.items_per_page_recibos
        }, function(data) {
            $scope.recibos = data.recibos;
            $scope.loading_recibos = false;
            $scope.count_recibos = data.count;
            $scope.pagination_recibos = data.pagination;
        });
    };
    
    $scope.onChangeTipo = function() {
        $scope.getServicios();
    };
    
    $scope.$watch('search.servicio_estado_id', function(oldValue, newValue) {
        $scope.page_servicios = 1;
        $scope.getServicios();
    });
        
    $scope.$watch('search.recibo_estado_id', function(oldValue, newValue) {
        $scope.page_recibos = 1;
        $scope.getRecibos();
    });
        
    $scope.$watch('search.servicio_text', function(oldValue, newValue) {
        $scope.page_servicios = 1;
        $scope.getServicios();
    });
    
    $scope.$watch('selected.servicio_id', function(oldValue, newValue) {
        $scope.page_recibos = 1;
        $scope.getRecibos();
    });
    
    $scope.showRecibosAdd = function(selected) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/recibos-add.html',
            controller: 'RecibosAddCtrl',
            backdrop: false,
            resolve: {
                servicio_id: function() {
                    return selected.servicio_id;
                }
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.getRecibos();
        });
    };
    
    $scope.showRecibosCancelar = function(recibo) {
        if (confirm('¿Está seguro de cancelar el pago?')) {
            recibo.estado_id = 4;
            recibo.fecha_pago = null;
            recibo.nro_documento = null;
            recibosservice.cancelarPago(recibo, function(data) {
                $scope.message = data;
            }, function(error) {
                recibo.estado_id = 3;
            });
        }
    };
    
    $scope.showRecibosDelete = function(recibo) {
        if (confirm('¿Está seguro de eliminar la recibo?')) {
            recibo.estado_id = 2;
            recibosservice.save(recibo, function(data) {
                $scope.message = data;
            }, function(error) {
                recibo.estado_id = 3;
            });
        }
    };
    
    $scope.showRecibosActivate = function(recibo) {
        if (confirm('¿Está seguro de activar la recibo?')) {
            recibo.estado_id = 4;
            recibosservice.save(recibo, function(data) {
                $scope.message = data;
            }, function(error) {
                recibo.estado_id = 3;
            });
        }
    };
    
    $scope.showRecibosEdit = function(recibo) {
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/recibos-edit.html',
            controller: 'RecibosEditCtrl',
            backdrop: false,
            resolve: {
                recibo: function() {
                    return recibo;
                }
            }
        });

        modalInstanceAdd.result.then(function (data) {
            $scope.message = data;
            $scope.getRecibos();
        });
    };
    
    $scope.showRecibosPagar = function(recibo) {
        var modalInstancePagar = $uibModal.open({
            templateUrl: 'views/recibos-pagar.html',
            controller: 'RecibosPagarCtrl',
            backdrop: false,
            resolve: {
                recibo: function() {
                    return recibo;
                }
            }
        });

        modalInstancePagar.result.then(function (data) {
            $scope.message = data;
            $scope.getRecibos();
        });
    };
    
    $scope.showRecibosPagadoDetail = function(recibo) {
        var modalInstancePagadoDetail = $uibModal.open({
            templateUrl: 'views/recibo-pagado-detail.html',
            controller: 'ReciboPagadoDetailCtrl',
            backdrop: false,
            resolve: {
                recibo: function() {
                    return recibo;
                }
            }
        });
    };
    
    $scope.onChangeItemsPerPageServicios = function() {
        $scope.page_servicios = 1;
        $scope.getServicios();
    };
    
    $scope.onChangeItemsPerPageRecibos = function() {
        $scope.page_recibos = 1;
        $scope.getRecibos();
    };
    
    $scope.showReporte = function(fecha_inicio, fecha_cierre) {
        var fecha_inicio = $utilsViewService.formatDate(fecha_inicio);
        var fecha_cierre = $utilsViewService.formatDate(fecha_cierre);
        serviciosservice.get({id: $scope.selected.servicio_id}, function(data) {
            var servicio = data.servicio;
            recibosservice.get({
                servicio_id: servicio.id,
                estado_id: $scope.search.recibo_estado_id,
                fecha_inicio: fecha_inicio,
                fecha_cierre: fecha_cierre,
            }, function(data) {
                var recibos = data.recibos;
                var body = [];
                body.push([
                    {text: 'Código', style: 'tableHeader'}, 
                    {text: 'Fecha de vencimiento', style: 'tableHeader'}, 
                    {text: 'Fecha de Pago', style: 'tableHeader'}, 
                    {text: 'Monto', style: 'tableHeader'}, 
                    {text: 'N° de Recibo', style: 'tableHeader'}, 
                    {text: 'N° de Documento', style: 'tableHeader'}, 
                    {text: 'Estado', style: 'tableHeader'}
                ]);
                angular.forEach(recibos, function(v_recibo, k_recibo) {
                    var row = [];
                    row.push({text: v_recibo.id || "", fontSize: 11});
                    row.push({text: v_recibo.fecha_vencimiento || "", fontSize: 11, alignment: 'center'});
                    row.push({text: v_recibo.fecha_pago || "", fontSize: 11, alignment: 'center'});
                    row.push({text: "S/ " + v_recibo.monto || "", fontSize: 11, alignment: 'right'});
                    row.push({text: v_recibo.nro_recibo || "", fontSize: 11, alignment: 'center'});
                    row.push({text: v_recibo.nro_documento || "", fontSize: 11, alignment: 'center'});
                    row.push({text: v_recibo.estado.descripcion || "", fontSize: 11, alignment: 'center'});
                    body.push(row);
                });
                var date = new Date();
                date = $utilsViewService.formatDate(date);
                
                var docDefinition = {
                    info: {
                        title: "Recibos del Servicio " + servicio.descripcion_detallada,
                        author: $rootScope.user.username,
                        subject: 'Reporte Detallado de Recibos del Servicio ' + servicio.descripcion_detallada,
                        keywords: 'servicio ' + servicio.descripcion_detallada + " recibos"
                    },
                    header: {
                        columns: [{
                            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4TIiaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTUtMTItMjlUMjA6NDI6MjlaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTUtMTItMjlUMjA6NDI6NTlaPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pv/bAEMABwQEBAUEBwUFBwoHBQcKDAkHBwkMDQsLDAsLDRENDQ0NDQ0RDQ8QERAPDRQUFhYUFB4dHR0eIiIiIiIiIiIiIv/bAEMBCAcHDQwNGBAQGBoVERUaICAgICAgICAgICAgICEgICAgICAhISEgICAhISEhISEhISIiIiIiIiIiIiIiIiIiIv/AABEIAFEBEgMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEEBQYIAgP/xABMEAABAwMCAgQHDAUKBwEAAAABAgMEAAURBhITIQcUIjEIFSNBUWFxGDJUYmNygZGToaLTM0JSc7EWQ1aCg5SjssHSJTQ1VZLR47P/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAwQFAQL/xAAmEQEAAgIBAwUAAgMAAAAAAAAAAQIDEQQSEyEUIjFRYRVBMnGB/9oADAMBAAIRAxEAPwDpGgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUCgUGm696YNL6KubNuujUp6Q83xgIyW1BKdxSN29xvvIqbFxrXjcPF8kVa97p/QPwK5/ZR/wA+pfQX/Hjvwe6e0D8Cuf2Uf8+nobnfg90/oH4Fc/so/wCfT0N/w78HuntA/Arn9lH/AD6ehv8Ah3obDfulvTtj0vbdRzmJXVbpgx2EpbL+CndlQLgTjHxvOKirxrWtr6e5yREba97p7QPwK5/ZR/z6l9Df8ee/B7p7QPwK5/ZR/wA+uehud6Ej2S7w7zaIt1hHMWW2l1vPfhQ7jjPMdxqtasxOpSRO13XHWiav6ddFaXvK7TKEmXKaA4piJbWlCv2FFbjfaqfHxbXjcI7Z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',
                            width: 150,
                            style: "headerPDFImage"
                        }, {
                            text: ""
                        }, {
                            text: "Transportes Metropolitanos de Trujillo",
                            style: "headerPDF"
                        }]
                    },
                    footer: function(currentPage, pageCount) {
                        return { text: currentPage.toString() + "/" + pageCount.toString(), alignment: 'center' };
                    },
                    content: [
                        { text: "Recibos del Servicio " + servicio.descripcion_detallada, style: 'header' },
                        { text: "Recibos registrados en el periodo del " + fecha_inicio + " al " + fecha_cierre, style: 'paragraph' },
                        { text: "Usuario: " + $rootScope.user.username + " Fecha: " + date, style: 'paragraph' },
                        {
                            layout: 'headerLineOnly',
                            table: {
                                headerRows: 1,
                                widths: [ 50, 72, 72, 45, 50, 70, 60],
                                body: body
                            }
                        }
                    ],
                    styles: {
                        headerPDFImage: {
                            alignment: 'left',
                            margin: [35, 10, 15, 15]
                        },
                        headerPDF: {
                            alignment: 'left',
                            margin: [4, 25, 15, 15]
                        },
                        header: {
                            fontSize: 14,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 30, 0, 20]
                        },
                        paragraph: {
                            fontSize: 11,
                            margin: [0, 4, 0, 8]
                        },
                        tableHeader: {
                            bold: true,
                            fontSize: 13,
                            alignment: 'center'
                        }
                    }
                };
                pdfMake.createPdf(docDefinition).open();
            });
            
        });
        
    };
    
    $scope.init();
});