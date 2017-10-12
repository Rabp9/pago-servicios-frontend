'use strict';

describe('Service: rolesservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var rolesservice;
  beforeEach(inject(function (_rolesservice_) {
    rolesservice = _rolesservice_;
  }));

  it('should do something', function () {
    expect(!!rolesservice).toBe(true);
  });

});
