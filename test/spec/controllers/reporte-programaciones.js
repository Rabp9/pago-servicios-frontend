'use strict';

describe('Controller: ReporteProgramacionesCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var ReporteProgramacionesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReporteProgramacionesCtrl = $controller('ReporteProgramacionesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReporteProgramacionesCtrl.awesomeThings.length).toBe(3);
  });
});
