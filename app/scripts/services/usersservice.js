'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.usersservice
 * @description
 * # usersservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('usersservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'users/:id.json', {}, {
        getPersonas: {
            method: 'GET',
            url: envservice.getHost() + 'users/getPersonas/.json'
        },
        login: {
            method: 'POST',
            url: envservice.getHost() + 'users/token/.json',
        },
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'users/getAdmin/.json',
        }
    });
});