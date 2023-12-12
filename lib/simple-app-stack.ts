import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import { type Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'
// import { Lambda } from 'aws-cdk-lib/aws-ses-actions'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import path = require('path')
// import * as sqs from 'aws-cdk-lib/aws-sqs'

export class SimpleAppStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // resources
    const bucket = new s3.Bucket(this, 'MySimpleAppBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED
    })

    const getPhotos = new lambda.NodejsFunction(this, 'MySimpleAppLambda', {
      runtime: Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos'
    })

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, 'MySimpleAppBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'MySimpleAppBucketName'
    })
  }
}
