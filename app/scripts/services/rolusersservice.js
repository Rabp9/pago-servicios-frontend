'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.rolusersservice
 * @description
 * # rolusersservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('rolusersservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'rol_users/:id.json');
});