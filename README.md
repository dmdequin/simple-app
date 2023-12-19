# Infrastructure as Code Project
## Using AWS CDK and TypeScript

This project was completed by following along with the course [Infrastructure as Code, Master AWS Cloud Development Kit CDK](https://www.udemy.com/course/aws-cdk-course/). I wanted to get some more experience with AWS and creating infrastructure as code.

Note: This online course is very outdated. Many of the packages used are depricated and have security vulnerabilities. In order to improve security I attempted to refactor the project to an updated version. I regret to say that I was unable to make the final change to the app, as a particular package does not have a current and working version that did not have conflicts.

### Local Development Instructions:
Building an app was not the point of this project. However, you can still spin up a local version if you so desire. Complete instructions will be added shortly.

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
* `npm start`       runs the app in local development mode

### Deployed App:
There is no longer anything deployed at this time, as I have deleted all corresponding buckets for the application.

Technologies used include:
- s3 Buckets
- Lambda Function
- CloudFront Distribution
- API Gateway
- CDK Metadata
