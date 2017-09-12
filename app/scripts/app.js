'use strict';

/**
 * @ngdoc overview
 * @name pagoServiciosFrontendApp
 * @description
 * # pagoServiciosFrontendApp
 *
 * Main module of the application.
 */
angular
.module('pagoServiciosFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'scrollable-table',
    'angularValidator',
    'angular-toArrayFilter'
])
.config(function($stateProvider, $urlRouterProvider) {
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
    };   
    
    var serviciosState = {
        name: 'servicios',
        url: '/servicios',
        templateUrl: 'views/servicios.html',
        controller: 'ServiciosCtrl',
        controllerAs: 'servicios',
        title: 'Servicios'
    };  
    
    var tiposState = {
        name: 'tipos',
        url: '/tipos',
        templateUrl: 'views/tipos.html',
        controller: 'TiposCtrl',
        controllerAs: 'tipos',
        title: 'Tipos'
    };  
    
    var programacionesState = {
        name: 'programaciones',
        url: '/programaciones',
        templateUrl: 'views/programaciones.html',
        controller: 'ProgramacionesCtrl',
        controllerAs: 'programaciones',
        title: 'Programaciones'
    };  
    
    var pagosState = {
        name: 'pagos',
        url: '/',
        templateUrl: 'views/pagos.html',
        controller: 'PagosCtrl',
        controllerAs: 'pagos',
        title: 'Pagos'
    };

    $stateProvider.state(mainState);
    $stateProvider.state(serviciosState);
    $stateProvider.state(tiposState);
    $stateProvider.state(programacionesState);
    $stateProvider.state(pagosState);
    $urlRouterProvider.when('', '/');
});