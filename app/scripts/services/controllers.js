'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.controllers
 * @description
 * # controllers
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
  .factory('controllers', function () {
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
