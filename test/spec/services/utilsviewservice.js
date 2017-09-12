'use strict';

describe('Service: utilsViewService', function () {

  // load the service's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // instantiate service
  var utilsViewService;
  beforeEach(inject(function (_utilsViewService_) {
    utilsViewService = _utilsViewService_;
  }));

  it('should do something', function () {
    expect(!!utilsViewService).toBe(true);
  });

});
