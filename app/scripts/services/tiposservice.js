'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.tiposservice
 * @description
 * # tiposservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('tiposservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'tipos/:id.json', {}, {
        getReporte: {
            method: 'GET',
            url: envservice.getHost() + 'tipos/getReporte.json'
        }
    });
});