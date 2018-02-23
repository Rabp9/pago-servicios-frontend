'use strict';

describe('Service: recibosservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var recibosservice;
  beforeEach(inject(function (_recibosservice_) {
    recibosservice = _recibosservice_;
  }));

  it('should do something', function () {
    expect(!!recibosservice).toBe(true);
  });

});
