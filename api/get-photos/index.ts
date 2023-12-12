// lambda home
import {
  type APIGatewayProxyEventV2,
  type Context,
  type APIGatewayProxyResultV2
} from 'aws-lambda'

async function getPhotos (
  event: APIGatewayProxyEventV2,
  context: Context):
  Promise<APIGatewayProxyResultV2> {
  return {
    statusCode: 200,
    body: 'Hello from lambda. It is live!'
  }
}

export { getPhotos }
