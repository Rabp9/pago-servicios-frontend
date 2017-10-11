'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.usersservice
 * @description
 * # usersservice
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
  .factory('usersservice', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
