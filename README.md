[![Build Status](https://travis-ci.org/themyth92/lambda-proxy-response.svg?branch=master)](https://travis-ci.org/themyth92/lambda-proxy-response)

# lambda-proxy-response
A wrap around response for aws lambda integration proxy

## Installation
`npm install lambda-proxy-response --save`

## Response creation
1. Response can be created using `response` method
  ```javascript
  const lambdaProxy = require('lambda-proxy-reponse');

  exports.handler = (event, context, callback) => {
    // response method needs at least 3 parameters
    // statusCode, headers, body
    const response = lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData' });

    // -> response = {
    //     statusCodes: 200,
    //     headers: {'X-header': 'Your headers value'},
    //     body: '{ "bodyData": "yourBodyData" }' 
    //   }
    callback(null, response);


    // OR you can pass the callback to the `response` method and it will be called automatically
    // The above implementation equal to
    lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData' }, callback);
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

## Options
From version 2.0, new config option has been introduced to set default values for response.

### body
Default body for every response. Will be overriden if you support new body in the call
```javascript
// ....
lambdaProxy.config({ body: { bodyData: 'yourDefaultBodyData' } });

// ......
  let response = lambdaProxy.response(200, { 'X-header': 'Your headers value' });

  // -> response = {
  //     statusCodes: 200,
  //     headers: {'X-header': 'Your headers value'},
  //     body: '{ "bodyData": "yourDefaultBodyData" }' 
  //   }

  response = lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData' });
  // -> response = {
  //     statusCodes: 200,
  //     headers: {'X-header': 'Your headers value'},
  //     body: '{ "bodyData": "yourBodyData" }' 
  //   }
```

### headers
Default headers for every response. By default, it will extend whatever headers you provide inside
your response. Can be turned off by setting `extendHeader` in options.
```javascript
// ....
lambdaProxy.config({ header: { 'X-Default-Header': 'Your default header' } });

// ......
  let response = lambdaProxy.response(200, null, { bodyData: 'yourBodyData' });

  // -> response = {
  //     statusCodes: 200,
  //     headers: { 'X-Default-Header': 'Your default header' },
  //     body: '{ "bodyData": "yourBodyData" }' 
  //   }

  // by default it will extend your header
  response = lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData' });
  // -> response = {
  //     statusCodes: 200,
  //     headers: { 'X-header': 'Your headers value', 'X-Default-Header': 'Your default header' },
  //     body: '{ "bodyData": "yourBodyData" }' 
  //   }

  // you can turn it off by setting config
  lambdaProxy.config({ header: { 'X-Default-Header': 'Your default header' }, extendHeader: false });

  // .......
  response = lambdaProxy.response(200, { 'X-header': 'Your headers value' }, { 'bodyData': 'yourBodyData' });
  // -> response = {
  //     statusCodes: 200,
  //     headers: { 'X-header': 'Your headers value' },
  //     body: '{ "bodyData": "yourBodyData" }' 
  //   }
```
### status
Default status code.
```javascript
// ....
lambdaProxy.config({ status: 200 });

// ....
  response = lambdaProxy.response();
  // -> response = {
  //     statusCodes: 200,
  //     headers: {},
  //     body: '{}' 
  //   }
```

## Note
This response template is only for used with newly aws lambda proxy integration.

You can read more about it [here](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)
