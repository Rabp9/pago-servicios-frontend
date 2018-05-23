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
    $uibModal, tiposservice, $utilsViewService) {
    
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
    
    $scope.downloadPDF = function() {
        var docDefinition = {
            header: function() {
                return [
                    {
                        style: 'table',
                        margin: [62,35,62,35],
                        table: {
                            widths: ['*', '*'],
                            headerRows: 0,
                            body: [
                                [
                                    {text: 'Booking Summary', style: 'topHeader', alignment: 'left'},
                                    {
                                        'base64-image-string-goes-here',
                                        width: 150,
                                        alignment: 'right'
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ]
            },
            footer: function(currentPage, pageCount) { 
                return [
                    {text: currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'footer'}
                ]
            },
            content: [],
            pageSize: 'A4',
            pageMargins: [62,80,62,80],
            styles: {
                topHeader: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 6, 0, 30],
                    alignment: 'left'
                },
                table: {
                    fontSize: 8,
                    alignment: 'left',
                    color: 'black',
                    margin: [0, 5, 0, 15]
                },
                header: {       
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 15],
                    alignment: 'left'
                },
                footer: {
                    fontSize: 8,
                    margin: [0, 25, 0, 17],
                    alignment: 'center'
                }
            }
        };
      pdfMake.createPdf(docDefinition).download();
    };
    $scope.init();
});