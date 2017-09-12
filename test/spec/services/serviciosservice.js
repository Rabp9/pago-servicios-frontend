'use strict';

describe('Service: serviciosService', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var serviciosService;
  beforeEach(inject(function (_serviciosService_) {
    serviciosService = _serviciosService_;
  }));

  it('should do something', function () {
    expect(!!serviciosService).toBe(true);
  });

});
