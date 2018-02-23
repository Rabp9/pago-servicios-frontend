'use strict';

describe('Controller: RealizarPagosCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RealizarPagosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RealizarPagosCtrl = $controller('RealizarPagosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RealizarPagosCtrl.awesomeThings.length).toBe(3);
  });
});
