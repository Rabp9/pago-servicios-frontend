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
    'ui.select',
    'scrollable-table',
    'angularValidator',
    'angular-toArrayFilter',
    'checklist-model',
    'ngDragDrop',
    'chart.js'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider, ChartJsProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
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
    
    var recibosState = {
        name: 'recibos',
        url: '/recibos',
        templateUrl: 'views/recibos.html',
        controller: 'RecibosCtrl',
        controllerAs: 'recibos',
        title: 'Recibos'
    };
    
    var realizarPagosState = {
        name: 'realizarPagos',
        url: '/realizar-pagos',
        templateUrl: 'views/realizar-pagos.html',
        controller: 'RealizarPagosCtrl',
        controllerAs: 'realizarPagos',
        title: 'Realizar Pagos'
    };
    
    var reporteTiposState = {
        name: 'reporteTipos',
        url: '/reportes/tipos',
        templateUrl: 'views/reporte-tipos.html',
        controller: 'ReporteTiposCtrl',
        controllerAs: 'reporteTipos',
        title: 'Reporte por Tipos'
    };
    
    var reporteServiciosState = {
        name: 'reporteServicios',
        url: '/reporte-servicios',
        templateUrl: 'views/reporte-servicios.html',
        controller: 'ReporteServiciosCtrl',
        controllerAs: 'reporteServicios',
        title: 'Reporte por Servicios'
    };

    var reporteRecibosState = {
        name: 'reporteRecibos',
        url: '/reporte-recibos',
        templateUrl: 'views/reporte-recibos.html',
        controller: 'ReporteRecibosCtrl',
        controllerAs: 'reporteRecibos',
        title: 'Reporte de Recibos de Pagos'
    };

    var reportePagosState = {
        name: 'reportePagos',
        url: '/reporte-pagos',
        templateUrl: 'views/reporte-pagos.html',
        controller: 'ReportePagosCtrl',
        controllerAs: 'reportePagos',
        title: 'Reporte de Pagos'
    };

    var rolesState = {
        name: 'roles',
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        controllerAs: 'roles',
        title: 'Roles'
    };
    
    var usersState = {
        name: 'users',
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users',
        title: 'Usuarios'
    };
    
    var usersLoginState = {
        name: 'usersLogin',
        url: '/users/login',
        templateUrl: 'views/users-login.html',
        controller: 'UsersLoginCtrl',
        controllerAs: 'usersLogin',
        title: 'Login'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(serviciosState);
    $stateProvider.state(tiposState);
    $stateProvider.state(recibosState);
    $stateProvider.state(realizarPagosState);
    $stateProvider.state(reporteTiposState);
    $stateProvider.state(reporteServiciosState);
    $stateProvider.state(reporteRecibosState);
    $stateProvider.state(reportePagosState);
    $stateProvider.state(rolesState);
    $stateProvider.state(usersState);
    $stateProvider.state(usersLoginState);
    $urlRouterProvider.when('', '/');
    
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#003053', '#51BAEB', '#004272', '#0077B2'],
        responsive: true
    });
    
    // Configure all line charts
    ChartJsProvider.setOptions('bar', {
        showLines: true
    });
})
.run(function($rootScope, $state, $window, $interval, recibosservice, 
$timeout, $cookies, $location) {
        
    $rootScope.logged = false;
    if ($cookies.get('pago-servicios-tmt-token')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('pago-servicios-tmt-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$state = $state;
    
    $rootScope.$on('$stateChangeSuccess', function(event, toParams, fromState, fromParams) {
        $rootScope.title = $state.current.title;
        $window.scrollTo(0, 0);
    });
    
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    
    $interval(function() {
        recibosservice.getPendientesPago(function(data) {
            var recibos = data.recibos;
            angular.forEach(recibos, function(value, key) {
                var title = value.servicio.descripcion;
                var extra = {
                    icon: 'images/icono.png',
                    body: 'Deuda de: ' + value.descripcion_detallada
                };
                // Lanzamos la notificación
                var notification = new Notification(title, extra);
                $timeout(function() {
                    notification.close();
                }, 30000);
            });
        });
    }, 300000);
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.logged) {
            if (toState.name !== 'usersLogin') {
                $location.path('/users/login');
            }
        } else {
            if ($rootScope.user.rol_user.rol.permisos.search(toState.controllerAs) >= 0) {
                $rootScope.message_root = null;
            } else {
                if (toState.controllerAs !== 'main' && toState.controllerAs !== 'usersLogin') {
                    event.preventDefault();
                    $rootScope.message_root = {
                        type: 'error',
                        text: 'No tiene permisos'
                    };
                }
            }
        }
    });
    
    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('pago-servicios-tmt-user');
            $cookies.remove('pago-servicios-tmt-token');
            $rootScope.user = undefined;
            $rootScope.logged = false;
            $state.go('usersLogin');
        }
    };
});