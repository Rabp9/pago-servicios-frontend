'use strict';

describe('Service: pagosservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var pagosservice;
  beforeEach(inject(function (_pagosservice_) {
    pagosservice = _pagosservice_;
  }));

  it('should do something', function () {
    expect(!!pagosservice).toBe(true);
  });

});
