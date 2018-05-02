'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.rolesservice
 * @description
 * # rolesservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('rolesservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'roles/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'roles/getAdmin/.json'
        }
    });
});