let tenders = [
  {
    tender: {
      id: 1
    }
  },
  {
    tender: {
      id: 2
    }
  },
  {
    tender: {
      id: 3
    }
  },
  {
    tender: {
      id: 4
    }
  },
  {
    tender: {
      id: 5
    }
  }
];
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

exports.createITT = async (event, context) => {
  try {
    logEvent(event);

    return buildResponse(201, {
      message: 'Invitation to tender created successfully.'
    });
  } catch (err) {
    return buildResponse(401, {
      message: err.message
    });
  }
};

exports.getTenders = async (event, context) => {
  try {
    logEvent(event);

    return event.pathParameters && event.pathParameters.id
      ? getTenderById(parseInt(event.pathParameters.id))
      : getAllTenders();
  } catch (err) {
    return buildResponse(401, {
      message: err.message
    });
  }
};

exports.deleteTender = async (event, context) => {
  try {
    logEvent(event);

    return buildResponse(204);
  } catch (err) {
    return buildResponse(401, {
      message: err.message
    });
  }
};

const getAllTenders = () => {
  return buildResponse(200, tenders, true);
};

const getTenderById = id => {
  let filteredTenders = tenders.filter(item => item.tender.id === id);

  if (filteredTenders.length > 0) return filteredTenders;

  return buildResponse(404, {
    message: 'Tender not found'
  });
};

const buildResponse = (
  statusCode,
  body = {},
  stringifyBody = false,
  headers = {
    'Access-Control-Allow-Origin': '*'
  }
) => {
  if (stringifyBody) body = JSON.stringify(body);

  return {
    statusCode,
    body,
    headers
  };
};

const logEvent = event => {
  console.log('Received event:', JSON.stringify(event, null, 2));
};
