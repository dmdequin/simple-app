// lambda home
import {
  type APIGatewayProxyEventV2,
  type Context,
  type APIGatewayProxyResultV2
} from 'aws-lambda'

const bucketName = process.env.PHOTO_BUCKET_NAME

async function getPhotos (
  event: APIGatewayProxyEventV2,
  context: Context):
  Promise<APIGatewayProxyResultV2> {
  console.log('I got the bucket name and it is ' + bucketName)
  return {
    statusCode: 200,
    body: 'Hello from lambda. It is live!'
  }
}

export { getPhotos }
