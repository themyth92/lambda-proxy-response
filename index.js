'use strict';
exports.response = function response(status, headers, body, cb) {
  // hearders must be an object, if not APIGateway will throw error
  if (typeof headers !== 'object') {
    headers = {};
  }

  if (typeof body === 'undefined' || typeof body === 'null') {
    body = {};
  }

  status = status || 400;
  var responseTemplate = createResponseTemplate(status, headers, body);

  // call cb
  if (cb) {
    cb(null, responseTemplate);
  }

  return responseTemplate;
};

exports.ok = function ok(headers, body, cb) {
  return exports.response(200, headers, body, cb);
}

exports.created = function created(headers, body, cb) {
  return exports.response(201, headers, body, cb);
}

exports.badRequest = function badRequest(headers, body, cb) {
  return exports.response(400, headers, body, cb);
}

exports.notAuthorized = function notAuthorized(headers, body, cb) {
  return exports.response(401, headers, body, cb);
}

exports.forbidden = function forbidden(headers, body, cb) {
  return exports.response(403, headers, body, cb);
}

exports.notFound = function notFound(headers, body, cb) {
  return exports.response(404, headers, body, cb);
}

exports.serverError = function serverError(headers, body, cb) {
  return exports.response(500, headers, body, cb);
}

function createResponseTemplate(status, headers, body) {
  return {
    statusCode: status,
    body: JSON.stringify(body),
    headers: headers
  };
}
