'use strict';

describe('Controller: PagosEliminarCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var PagosEliminarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PagosEliminarCtrl = $controller('PagosEliminarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PagosEliminarCtrl.awesomeThings.length).toBe(3);
  });
});
