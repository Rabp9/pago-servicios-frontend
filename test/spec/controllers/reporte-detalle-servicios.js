'use strict';

describe('Controller: ReporteDetalleServiciosCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ReporteDetalleServiciosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReporteDetalleServiciosCtrl = $controller('ReporteDetalleServiciosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReporteDetalleServiciosCtrl.awesomeThings.length).toBe(3);
  });
});
