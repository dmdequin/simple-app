import {
  type APIGatewayProxyEventV2,
  type Context,
  type APIGatewayProxyResultV2
} from 'aws-lambda'
import { S3 } from 'aws-sdk'

const bucketName = process.env.PHOTO_BUCKET_NAME!
const s3 = new S3()

async function generateUrl(object: S3.Object):Promise<{filename: string, url: string}> {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: bucketName,
    Key: object.Key!,
    Expires: (24 * 60 * 60)
  })
  return {
    filename: object.Key!,
    url
  }
}

async function getPhotos (
  event: APIGatewayProxyEventV2,
  context: Context):
  Promise<APIGatewayProxyResultV2> {
  console.log('I got the bucket name and it is ' + bucketName)
  try{
    const {Contents: results} = await s3.listObjects({Bucket: bucketName}).promise()
    const photos = await Promise.all(results!.map(result => generateUrl(result)))
    return {
      statusCode: 200,
      body: JSON.stringify(photos)
    }
  } catch (error) {
    return {
      statusCode: 500,
      // assert that error is type Error
      body: (error as Error).message
    }
  }
}

export { getPhotos }
