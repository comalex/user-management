const AWS = require('aws-sdk');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var bodyParser = require('body-parser');
var express = require('express');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = 'peopleTable';
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV;
}

var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const getUserId = (request) => {
  try {
    const reqContext = request.apiGateway.event.requestContext;
    const authProvider = reqContext.identity.cognitoAuthenticationProvider;
    return authProvider
      ? authProvider.split(':CognitoSignIn:').pop()
      : 'UNAUTH';
  } catch (error) {
    return 'UNAUTH';
  }
};

app.get('/people', function (request, response) {
  let params = {
    TableName: tableName,
    limit: 100,
  };
  dynamodb.scan(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result.Items),
      });
    }
  });
});

app.get('/people/:id', function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      id: request.params.id,
    },
  };
  dynamodb.get(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result.Item),
      });
    }
  });
});

app.put('/people', function (request, response) {
  const timestamp = new Date().toISOString();
  const params = {
    TableName: tableName,
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: { '#name': 'name', '#rank': 'rank' },
    ExpressionAttributeValues: {},
    ReturnValues: 'ALL_NEW',
  };
  params.UpdateExpression = 'SET ';
  if (request.body.name) {
    params.ExpressionAttributeValues[':name'] = request.body.name;
    params.UpdateExpression += '#name = :name, ';
  }
  if (request.body.rank) {
    params.ExpressionAttributeValues[':rank'] = request.body.rank;
    params.UpdateExpression += '#rank = :rank, ';
  }
  if (request.body.name || request.body.rank) {
    params.ExpressionAttributeValues[':updatedAt'] = timestamp;
    params.UpdateExpression += 'updatedAt = :updatedAt';
  }
  dynamodb.update(params, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result.Attributes),
      });
    }
  });
});

app.post('/people', function (request, response) {
  const timestamp = new Date().toISOString();
  let params = {
    TableName: tableName,
    Item: {
      ...request.body,
      id: uuidv4(), // auto-generate id
      createdAt: timestamp,
      updatedAt: timestamp,
      userId: getUserId(request), // userId from request identity context
    },
  };

  dynamodb.put(params, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(params.Item),
      });
    }
  });
});

app.delete('/people/:id', function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      id: request.params.id,
    },
  };
  dynamodb.delete(params, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result),
      });
    }
  });
});

app.listen(3000, function () {
  console.log('App started');
});
module.exports = app;
