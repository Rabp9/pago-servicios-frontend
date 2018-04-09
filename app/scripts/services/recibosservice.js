'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.recibosservice
 * @description
 * # recibosservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('recibosservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'recibos/:id.json', {}, {
        getByServicio: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getByServicio/:servicio_id.json'
        },
        getByServicioNoPagados: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getByServicioNoPagados/:servicio_id.json'
        },
        getByDates: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getByDates/:fecha_inicio/:fecha_cierre.json'
        },
        getByDatesPagos: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getByDatesPagos/:fecha_inicio/:fecha_cierre.json'
        },
        getPendientesPago: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getPendientesPago/.json'
        },
        cancelarPago: {
            method: 'POST',
            url: envservice.getHost() + 'recibos/cancelarPago/.json'
        },
        pagarMany: {
            method: 'POST',
            url: envservice.getHost() + 'recibos/pagarMany/.json'
        },
        saveMany: {
            method: 'POST',
            url: envservice.getHost() + 'recibos/saveMany/.json'
        },
        getEstadisticas: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getEstadisticas/.json'
        },
        getChartBarData: {
            method: 'GET',
            url: envservice.getHost() + 'recibos/getChartBarData/:anio.json'
        }
    });
});