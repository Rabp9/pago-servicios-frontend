'use strict';

describe('Service: controllersservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var controllersservice;
  beforeEach(inject(function (_controllersservice_) {
    controllersservice = _controllersservice_;
  }));

  it('should do something', function () {
    expect(!!controllersservice).toBe(true);
  });

});
