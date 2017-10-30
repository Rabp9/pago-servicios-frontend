'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.programacionesservice
 * @description
 * # programacionesservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('programacionesservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'programaciones/:id.json', {}, {
        getByServicio: {
            method: 'GET',
            url: envservice.getHost() + 'programaciones/getByServicio/:servicio_id.json'
        },
        getByServicioNoPagados: {
            method: 'GET',
            url: envservice.getHost() + 'programaciones/getByServicioNoPagados/:servicio_id.json'
        },
        getByDates: {
            method: 'GET',
            url: envservice.getHost() + 'programaciones/getByDates/:fecha_inicio/:fecha_cierre/:estado_id.json'
        },
        getPendientesPago: {
            method: 'GET',
            url: envservice.getHost() + 'programaciones/getPendientesPago/.json'
        },
        cancelarPago: {
            method: 'POST',
            url: envservice.getHost() + 'programaciones/cancelarPago/.json'
        }
    });
});