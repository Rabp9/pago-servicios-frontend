'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.serviciosService
 * @description
 * # serviciosService
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('serviciosservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'servicios/:id.json', {}, {
        getPendientesPago: {
            method: 'GET',
            url: envservice.getHost() + 'servicios/getPendientesPago/.json'
        }
    });
});