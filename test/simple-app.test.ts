import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as SimpleApp from '../lib/simple-app-stack';
// import 'aws-cdk-lib/assert/jest';

test('Simple App Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SimpleApp.SimpleAppStack(app, 'MyTestStack');
    // THEN
    const template = Template.fromStack(stack);

     template.templateMatches({
        Resources: {
            "MySimpleAppBucket6B59014A": {
            "Type": "AWS::S3::Bucket",
            "Properties": {
                "BucketEncryption": {
                "ServerSideEncryptionConfiguration": [
                {
                "ServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "AES256"
                }
                }
                ]
                },
                "VersioningConfiguration": {
                "Status": "Enabled"
                }
            },
            "UpdateReplacePolicy": "Retain",
            "DeletionPolicy": "Retain",
            },
        },
      });

   template.hasResourceProperties('AWS::S3::Bucket', {});
});
