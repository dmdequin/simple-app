import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import { type Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import path = require('path')
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2'

export class SimpleAppStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // resources
    const bucket = new s3.Bucket(this, 'MySimpleAppBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED
    })

    // eslint-disable-next-line no-new
    new BucketDeployment(this, 'MySimpleAppPhotos', {
      sources: [
        Source.asset(path.join(__dirname, '..', 'photos'))
      ],
      destinationBucket: bucket
    })

    const getPhotos = new lambda.NodejsFunction(this, 'MySimpleAppLambda', {
      runtime: Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos',
      environment: {
        PHOTO_BUCKET_NAME: bucket.bucketName
      }
    })

    // Create IAM rules
    const bucketContainerPermissions = new PolicyStatement()
    // add resources and actions
    bucketContainerPermissions.addResources(bucket.bucketArn)
    // add permission to list contents of this bucket
    bucketContainerPermissions.addActions('s3:ListBucket')

    const bucketPermissions = new PolicyStatement()
    bucketPermissions.addResources(`${bucket.bucketArn}/*`)
    bucketPermissions.addActions('s3:GetObject', 's3:PutObject')

    // add function to policy permissions
    getPhotos.addToRolePolicy(bucketPermissions)
    getPhotos.addToRolePolicy(bucketContainerPermissions)

    // API gateway for lambda function
    const httpApi = new apigwv2.HttpApi(this, 'MySimpleAppHttpApi', {
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [apigwv2.CorsHttpMethod.GET]
      },
      apiName: 'photoApi',
      createDefaultStage: true
    })

    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, 'MySimpleAppBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'MySimpleAppBucketName'
    })
  }
}
