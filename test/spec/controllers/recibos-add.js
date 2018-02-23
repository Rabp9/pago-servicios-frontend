'use strict';

describe('Controller: RecibosAddCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RecibosAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecibosAddCtrl = $controller('RecibosAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecibosAddCtrl.awesomeThings.length).toBe(3);
  });
});
