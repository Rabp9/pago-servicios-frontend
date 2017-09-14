'use strict';

describe('Service: tiposservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var tiposservice;
  beforeEach(inject(function (_tiposservice_) {
    tiposservice = _tiposservice_;
  }));

  it('should do something', function () {
    expect(!!tiposservice).toBe(true);
  });

});
