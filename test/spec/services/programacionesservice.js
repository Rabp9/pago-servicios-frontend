'use strict';

describe('Service: programacionesservice', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var programacionesservice;
  beforeEach(inject(function (_programacionesservice_) {
    programacionesservice = _programacionesservice_;
  }));

  it('should do something', function () {
    expect(!!programacionesservice).toBe(true);
  });

});
