'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.utilsViewService
 * @description
 * # utilsViewService
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('$utilsViewService', function () {
    return {
        enable: function(id) {
            $(id).removeClass('disabled');
            $(id).prop('disabled', false);
        },
        disable: function(id) {
            $(id).addClass('disabled');
            $(id).prop('disabled', true);
        }
    };
});