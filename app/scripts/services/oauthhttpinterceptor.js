'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.oauthHttpInterceptor
 * @description
 * # oauthHttpInterceptor
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
  .factory('oauthHttpInterceptor', function () {
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
