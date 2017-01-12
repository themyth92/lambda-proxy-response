'use strict';
class LambdaProxyResponse {
  constructor(options) {
    this.options = options || { headers: {}, body: {}, status: null, extendHeader: true };
  }

  config(options) {
    if (typeof options === 'object' && options !== null) {
      Object.assign(this.options, options);
    }
  }

  response(status, headers, body, cb, options) {
    let responseStatus = {};
    let responseHeader = {};
    let responseBody = {};

    responseStatus = status || this.options.status || 400;

    // set headers
    if (typeof headers !== 'object' || headers === null ) {
      if (this.options && this.options.headers) {
        responseHeader = this.options.headers;
      } else {
        responseHeader = {};
      }
    } else {
      if (this.options.headers && this.options.extendHeader) {
        responseHeader = Object.assign(responseHeader, headers, this.options.headers);
      } else {
        responseHeader = headers;
      }
    }

    // set body
    if (typeof body === 'undefined' || body === null) {
      if (this.options && this.options.body) {
        responseBody = this.options.body;
      } else {
        responseBody = {};
      }
    } else {
      responseBody = body;
    }

    const responseTemplate = this._createResponseTemplate(responseStatus, responseHeader, responseBody);

    // call cb
    if (typeof cb === 'function') {
      cb(null, responseTemplate);
    }

    return responseTemplate;
  }

  ok(headers, body, cb, options) {
    return this.response(200, headers, body, cb, options || {});
  }

  created(headers, body, cb, options) {
    return this.response(201, headers, body, cb, options || {});
  }

  badRequest(headers, body, cb, options) {
    return this.response(400, headers, body, cb, options || {});
  }

  notAuthorized(headers, body, cb, options) {
    return this.response(401, headers, body, cb, options || {});
  }

  forbidden(headers, body, cb, options) {
    return this.response(403, headers, body, cb, options || {});
  }

  notFound(headers, body, cb, options) {
    return this.response(404, headers, body, cb, options || {});
  }

  serverError(headers, body, cb, options) {
    return this.response(500, headers, body, cb, options || {});
  }

  _createResponseTemplate(status, headers, body) {
    return {
      statusCode: status,
      body: JSON.stringify(body),
      headers: headers
    }; 
  }
}

module.exports = new LambdaProxyResponse();
