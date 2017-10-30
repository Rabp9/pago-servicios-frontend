'use strict';

describe('Controller: ProgramacionesPagarCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ProgramacionesPagarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesPagarCtrl = $controller('ProgramacionesPagarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesPagarCtrl.awesomeThings.length).toBe(3);
  });
});
