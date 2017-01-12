'use strict';
const lambdaProxy = require('../index.js');

describe('[ Test ]', () => {
  describe('method:response', () => {
    it('should return correct response template if all parameter is supported with correct data',
      () => {
      const params = [
        {
          status: 400,
          headers: {},
          body: {}
        },
        {
          status: null,
          headers: '',
          body: 'data'
        },
        {
          status: '400'
        },
        {
          status: 200,
          headers: { 'X-Request-Id': 'abcdef' },
          body: { data: 'somedata' }
        },
        {
          status: 200,
          headers: null,
          body: null,
          defaultOpts: {
            headers: { 'X-Request-Id': 'abcdef' },
            body: { data: 'somedata' }
          }
        },
        {
          status: 200,
          headers: { 'X-1': 'XA' },
          body: 'data',
          defaultOpts: {
            headers: { 'X-Request-Id': 'abcdef' },
            body: { data: 'somedata' }
          }
        },
        {
          status: 200,
          headers: { 'X-2': 'XA' },
          body: 'data',
          defaultOpts: {
            headers: { 'X-Request-Id': 'abcdef' },
            body: { data: 'somedata' },
            extendHeader: true
          }
        },
        {
          status: 200,
          headers: { 'X-3': 'XA' },
          body: 'data',
          defaultOpts: {
            headers: { 'X-Request-Id': 'abcdef' },
            body: { data: 'somedata' },
            extendHeader: false
          }
        },
        {
          status: 200,
          headers: { 'X-4': 'XA' },
          body: 'data',
          defaultOpts: 'weird string'
        }        
      ];

      const expectedTemplate = [
        {
          statusCode: 400,
          body: '{}',
          headers: {}
        },
        {
          statusCode: 400,
          body: '"data"',
          headers: {}
        },
        {
          statusCode: '400',
          body: '{}',
          headers: {}
        },
        {
          statusCode: 200,
          headers: { 'X-Request-Id': 'abcdef' },
          body: '{"data":"somedata"}'
        },
        {
          statusCode: 200,
          headers: { 'X-Request-Id': 'abcdef' },
          body: '{"data":"somedata"}'
        },
        {
          statusCode: 200,
          headers: { 'X-1': 'XA', 'X-Request-Id': 'abcdef' },
          body: '"data"'
        },
        {
          statusCode: 200,
          headers: { 'X-2': 'XA', 'X-Request-Id': 'abcdef' },
          body: '"data"'
        },
        {
          statusCode: 200,
          headers: { 'X-3': 'XA' },
          body: '"data"'
        },
        {
          statusCode: 200,
          headers: { 'X-4': 'XA' },
          body: '"data"'
        }];

      params.map((param, index) => {
        if (param.defaultOpts) {
          lambdaProxy.config(param.defaultOpts);
        }

        expect(lambdaProxy.response(param.status, param.headers, param.body)).toEqual(expectedTemplate[index]);
      });
    });

    it('should call cb when it is defined', () => {
      const cbSpy = jasmine.createSpy('spy');
      const params = { status: 200, headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' } };
      const response = lambdaProxy.response(params.status, params.headers, params.body, cbSpy);

      expect(cbSpy).toHaveBeenCalledWith(null, response);
    });
  });

  describe('method:ok', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.ok(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(200, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:created', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.created(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(201, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:badRequest', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', function test() {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.badRequest(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(400, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:notAuthorized', () => {
    beforeEach(function beforeEach() {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.notAuthorized(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(401, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:forbidden', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.forbidden(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(403, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:notFound', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.notFound(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(404, params.headers, params.body, params.cb, {});
    });
  });

  describe('method:serverError', () => {
    beforeEach(() => {
      spyOn(lambdaProxy, 'response');
    });

    it('shoul call `.response` with correct parameter', () => {
      const params = { headers: { 'X-Request-Id': 'abcdef' }, body: { data: 'somedata' }, cb: function() {} };

      lambdaProxy.serverError(params.headers, params.body, params.cb);
      expect(lambdaProxy.response).toHaveBeenCalledWith(500, params.headers, params.body, params.cb, {});
    });
  });
});
