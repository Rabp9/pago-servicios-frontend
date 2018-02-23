'use strict';

describe('Controller: RecibosCtrl', function () {

  // load the controller's module
  beforeEach(module('pagoServiciosFrontendApp'));

  var RecibosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecibosCtrl = $controller('RecibosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecibosCtrl.awesomeThings.length).toBe(3);
  });
});
