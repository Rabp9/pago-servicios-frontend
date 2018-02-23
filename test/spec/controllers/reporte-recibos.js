'use strict';

describe('Controller: ReporteRecibosCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ReporteRecibosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReporteRecibosCtrl = $controller('ReporteRecibosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReporteRecibosCtrl.awesomeThings.length).toBe(3);
  });
});
