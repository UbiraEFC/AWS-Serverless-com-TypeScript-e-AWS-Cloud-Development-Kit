import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

/**
 * AWS Lambda handler function for fetching products.
 *
 * @param event - The API Gateway event object containing request details.
 * @param context - The Lambda context object containing runtime information.
 * @returns A promise that resolves to an API Gateway proxy result.
 *
 * @remarks
 * - `lambdaRequestId`: The unique request ID generated by AWS Lambda for the current invocation.
 * - `apiRequestId`: The unique request ID generated by API Gateway for the current request.
 */
export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log(
    `API Gateway Request ID ${apiRequestId}- Lambda Request ID: ${lambdaRequestId}`
  );

  const method = event.httpMethod;
  if (event.resource === '/products') {
    if (method == 'GET') {
      console.log('GET');

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'GET Products - OK' }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Bad request' }),
  };
}
