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
        getByTipo: {
            method: 'GET',
            url: envservice.getHost() + 'servicios/getByTipo/:tipo_id.json'
        },
        getReport: {
            method: 'GET',
            url: envservice.getHost() + 'servicios/getReport/:tipo_id.json'
        },
        search: {
            method: 'GET',
            url: envservice.getHost() + 'servicios/search/:texto.json'
        }
    });
});