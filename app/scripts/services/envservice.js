'use strict';

/**
 * @ngdoc service
 * @name pagoServiciosFrontendApp.envService
 * @description
 * # envService
 * Factory in the pagoServiciosFrontendApp.
 */
angular.module('pagoServiciosFrontendApp')
.factory('envservice', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8000/pago-servicios-backend/';
                case '172.20.1.2':
                    return 'http://172.20.1.2:8989/pago-servicios/api/';
            }
        }
    };
});