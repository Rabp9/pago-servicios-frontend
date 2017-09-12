'use strict';

describe('Controller: PagosRegistrarCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var PagosRegistrarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PagosRegistrarCtrl = $controller('PagosRegistrarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PagosRegistrarCtrl.awesomeThings.length).toBe(3);
  });
});
