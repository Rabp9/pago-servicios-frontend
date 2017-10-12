'use strict';

/**
 * @ngdoc function
 * @name pagoServiciosFrontendApp.controller:UsersLoginCtrl
 * @description
 * # UsersLoginCtrl
 * Controller of the pagoServiciosFrontendApp
 */
angular.module('pagoServiciosFrontendApp')
.controller('UsersLoginCtrl', function ($scope, usersservice, $cookies, $state, $rootScope, $utilsViewService) {
    $scope.message = {};
    
    $scope.loginUser = function(user, boton) {
        $('#' + boton).text('Login...');
        $utilsViewService.disable('#' + boton);
        
        var data = usersservice.login(user, function() {
            if (!data.user) {
                $scope.message = data.message;
            } else {
                $cookies.putObject('pago-servicios-tmt-user', data.user);
                $cookies.put('pago-servicios-tmt-token', data.token);
                $rootScope.user = data.user;
                $rootScope.logged = true;
                $state.go('main');
            }
        }, function(err) {
            $utilsViewService.enable('#' + boton);
            $('#' + boton).text('Login');
            $scope.message = err.data;
        });
    };
});