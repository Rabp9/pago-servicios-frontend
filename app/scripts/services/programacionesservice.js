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
        }
    });
});