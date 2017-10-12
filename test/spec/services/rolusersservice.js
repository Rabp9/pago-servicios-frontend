'use strict';

describe('Service: rolusersservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var rolusersservice;
  beforeEach(inject(function (_rolusersservice_) {
    rolusersservice = _rolusersservice_;
  }));

  it('should do something', function () {
    expect(!!rolusersservice).toBe(true);
  });

});
