'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.controllersservice
 * @description
 * # controllersservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('controllersservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'controllers/:id.json', {});
});