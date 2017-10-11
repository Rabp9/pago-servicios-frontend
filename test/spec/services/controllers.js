'use strict';

describe('Service: controllers', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var controllers;
  beforeEach(inject(function (_controllers_) {
    controllers = _controllers_;
  }));

  it('should do something', function () {
    expect(!!controllers).toBe(true);
  });

});
