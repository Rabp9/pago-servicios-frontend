'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.pagosservice
 * @description
 * # pagosservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('pagosservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'pagos/:id.json', {}, {
        getByDates: {
            method: 'GET',
            url: envservice.getHost() + 'pagos/getByDates/:fecha_inicio/:fecha_cierre/.json'
        }
    });
});