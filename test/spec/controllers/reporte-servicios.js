'use strict';

describe('Controller: ReporteServiciosCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ReporteServiciosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReporteServiciosCtrl = $controller('ReporteServiciosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReporteServiciosCtrl.awesomeThings.length).toBe(3);
  });
});
