'use strict';

describe('Controller: RecibosPagarCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RecibosPagarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecibosPagarCtrl = $controller('RecibosPagarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecibosPagarCtrl.awesomeThings.length).toBe(3);
  });
});
