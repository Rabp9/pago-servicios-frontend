'use strict';

describe('Controller: RecibosPagarManyCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RecibosPagarManyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecibosPagarManyCtrl = $controller('RecibosPagarManyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecibosPagarManyCtrl.awesomeThings.length).toBe(3);
  });
});
