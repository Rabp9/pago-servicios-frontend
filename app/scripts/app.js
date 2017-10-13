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
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
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
    $stateProvider.state(programacionesState);
    $stateProvider.state(pagosState);
    $stateProvider.state(reporteServiciosState);
    $stateProvider.state(reporteProgramacionesState);
    $stateProvider.state(reportePagosState);
    $stateProvider.state(rolesState);
    $stateProvider.state(usersState);
    $stateProvider.state(usersLoginState);
    $urlRouterProvider.when('', '/');
})
.run(function($rootScope, $state, $window, $interval, programacionesservice, 
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
        programacionesservice.getPendientesPago(function(data) {
            var programaciones = data.programaciones;
            angular.forEach(programaciones, function(value, key) {
                var title = value.servicio.descripcion;
                var extra = {
                    icon: 'images/icono.png',
                    body: 'Deuda de: ' + value.descripcion_detallada
                };
                // Lanzamos la notificación
                var notification = new Notification(title, extra);
                $timeout(function() {
                    notification.close();
                }, 6000);
            });
        });
    }, 8000);
    
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