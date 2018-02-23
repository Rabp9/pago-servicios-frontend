'use strict';

describe('Controller: RecibosEditCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RecibosEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecibosEditCtrl = $controller('RecibosEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecibosEditCtrl.awesomeThings.length).toBe(3);
  });
});
