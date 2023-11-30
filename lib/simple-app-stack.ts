import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // resource
    const bucket = new s3.Bucket(this, 'MySimpleAppBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

  }
}
