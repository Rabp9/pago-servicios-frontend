'use strict';

describe('Controller: ProgramacionesPagarManyCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ProgramacionesPagarManyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgramacionesPagarManyCtrl = $controller('ProgramacionesPagarManyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProgramacionesPagarManyCtrl.awesomeThings.length).toBe(3);
  });
});
