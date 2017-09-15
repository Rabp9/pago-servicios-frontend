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
        url: '/pagos',
        templateUrl: 'views/pagos.html',
        controller: 'PagosCtrl',
        controllerAs: 'pagos',
        title: 'Pagos'
    };

    var reporteServiciosState = {
        name: 'reporteServicios',
        url: '/reporte-servicios',
        templateUrl: 'views/reporte-servicios.html',
        controller: 'ReporteServiciosCtrl',
        controllerAs: 'reporteServicios',
        title: 'Reporte de Servicios'
    };

    var reporteProgramacionesState = {
        name: 'reporteProgramaciones',
        url: '/reporte-programaciones',
        templateUrl: 'views/reporte-programaciones.html',
        controller: 'ReporteProgramacionesCtrl',
        controllerAs: 'reporteProgramaciones',
        title: 'Reporte de Programaciones de Pagos'
    };

    var reportePagosState = {
        name: 'reportePagos',
        url: '/reporte-pagos',
        templateUrl: 'views/reporte-pagos.html',
        controller: 'ReportePagosCtrl',
        controllerAs: 'reportePagos',
        title: 'Reporte de Pagos'
    };

    $stateProvider.state(mainState);
    $stateProvider.state(serviciosState);
    $stateProvider.state(tiposState);
    $stateProvider.state(programacionesState);
    $stateProvider.state(pagosState);
    $stateProvider.state(reporteServiciosState);
    $stateProvider.state(reporteProgramacionesState);
    $stateProvider.state(reportePagosState);
    $urlRouterProvider.when('', '/');
});