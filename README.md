[![Build Status](https://travis-ci.org/themyth92/lambda-proxy-response.svg?branch=master)](https://travis-ci.org/themyth92/lambda-proxy-response)

# lambda-proxy-response
A wrap around response for aws lambda integration proxy

## Installation
`npm install lambda-proxy-response --save`

## Response creation
1. Response can be created using `response` method
```
var lambdaProxy = require('lambda-proxy-reponse');

exports.handler = (event, context, callback) => {
  // response method needs at least 3 parameters
  // statusCode, headers, body
  var response = lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData });
  
  // -> response = {
  //     statusCodes: 200,
  //     headers: {'X-header': 'Your headers value'},
  //     body: '{ "bodyData": "yourBodyData" }' 
  //   }
  callback(null, response);
  
  
  // OR you can pass the callback to the `response` method and it will be called automatically
  // The above implementation equal to
  lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData }, callback);
};
```
2. Some others shorthand method, useful for common http status
  - `lambdaProxy.ok = lambdaProxy.response(200, ...)`
  - `lambdaProxy.created = lambdaProxy.response(201, ...)`
  - `lambdaProxy.badRequest = lambdaProxy.response(400, ...)`
  - `lambdaProxy.unAuthorized = lambdaProxy.response(401, ...)`
  - `lambdaProxy.forbidden = lambdaProxy.response(403, ...)`
  - `lambdaProxy.notFound = lambdaProxy.response(404, ...)`
  - `lambdaProxy.serverError = lambdaProxy.response(500, ...)`

## Note
This response template is only for used with newly aws lambda proxy integration.

You can read more about it [here](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)
