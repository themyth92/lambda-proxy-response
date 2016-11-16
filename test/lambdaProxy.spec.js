'use strict';
var lambdaProxy = require('../index.js');

describe('[ Test ]', function desc() {
  describe('method:response', function desc() {
    it('should return correct response template if all parameter is supported with correct data',
      function test() {
      var params = [{ status: 400, headers: {}, body: {} },
        { status: null, headers: '', body: 'data' },
        { status: '400' },
        { status: 200, headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' } }];
      var expectedTemplate = [{ statusCode: 400, body: '{}', headers: {} },
        { statusCode: 400, body: '"data"', headers: {} },
        { statusCode: '400', body: '{}', headers: {} },
        { statusCode: 200, headers: { 'X-Request-Id': 'abcdef' }, body: '{"data":"somedata"}' }];

      params.map(function map(param, index) {
        expect(lambdaProxy.response(param.status, param.headers, param.body)).toEqual(expectedTemplate[index]);
      });
    });

    it('should call cb when it is defined', function test() {
      var cbSpy = jasmine.createSpy('spy');
      var params = { status: 200, headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' } };
      var response = lambdaProxy.response(params.status, params.headers, params.body, cbSpy);

      expect(cbSpy).toHaveBeenCalledWith(null, response);
    });
  });

  describe('method:ok', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.ok(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(200, params.headers, params.body, params.cb);
    });
  });

  describe('method:created', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.created(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(201, params.headers, params.body, params.cb);
    });
  });

  describe('method:badRequest', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.badRequest(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(400, params.headers, params.body, params.cb);
    });
  });

  describe('method:notAuthorized', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.notAuthorized(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(401, params.headers, params.body, params.cb);
    });
  });

  describe('method:forbidden', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.forbidden(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(403, params.headers, params.body, params.cb);
    });
  });

  describe('method:notFound', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.notFound(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(404, params.headers, params.body, params.cb);
    });
  });

  describe('method:serverError', function desc() {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      var params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.serverError(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(500, params.headers, params.body, params.cb);
    });
  });
});
