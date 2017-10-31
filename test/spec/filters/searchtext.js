'use strict';

describe('Filter: searchText', function () {

  // load the filter's module
  beforeEach(module('pagoServiciosFrontendApp'));

  // initialize a new instance of the filter before each test
  var searchText;
  beforeEach(inject(function ($filter) {
    searchText = $filter('searchText');
  }));

  it('should return the input prefixed with "searchText filter:"', function () {
    var text = 'angularjs';
    expect(searchText(text)).toBe('searchText filter: ' + text);
  });

});
