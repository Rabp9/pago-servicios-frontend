'use strict';

describe('Controller: ReciboPagadoDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ReciboPagadoDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReciboPagadoDetailCtrl = $controller('ReciboPagadoDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReciboPagadoDetailCtrl.awesomeThings.length).toBe(3);
  });
});
