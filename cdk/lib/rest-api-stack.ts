import * as apigwyv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib/core';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


/*
Composed of: 
Public s3 bucket for the web static frontend
Private Files Bucket for files and images that are only employers are granted access
Lambda Authentication and Session functions
*/
export class RestApiStack extends cdk.Stack {
   constructor(scope: Construct, id: string, props: cdk.StackProps){
         super(scope, id, props);

         const privateBucket = new s3.Bucket(this, 'PrivateBucket', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            versioned: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
         });

         const filesLambda = new NodejsFunction(this, "ImageFn", {
            entry: "lambda/hello/index.ts",
            handler: "handler",
            runtime: lambda.Runtime.NODEJS_22_X,
            environment: {
               BUCKET_NAME: privateBucket.bucketName,
               JWT_SECRET: 'some_secret'
            }
         });

         privateBucket.grantRead(filesLambda);

         const publicBucket = new s3.Bucket(this, "PublicBucket", {
            websiteIndexDocument: "index.html",
            blockPublicAccess: new s3.BlockPublicAccess({
               blockPublicAcls: false,
               blockPublicPolicy: false,
               ignorePublicAcls: false,
               restrictPublicBuckets: false,
            }),
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
         });
         
         new s3deploy.BucketDeployment(this, 'Deploy-Static-Pages', {
            sources: [s3deploy.Source.asset('./public')],
            destinationBucket: publicBucket
         })

         const httpApi = new apigwyv2.HttpApi(this, 'HttpApi', {
            apiName: 'aadelrayo API',

         })
         
         const fileLambdaIntegration = new integrations.HttpLambdaIntegration('FileIntegration', filesLambda);

         httpApi.addRoutes({
         path: '/files/{proxy+}',
         methods: [apigwyv2.HttpMethod.GET],
         integration: fileLambdaIntegration,
         });

         const s3Integration = new integrations.HttpUrlIntegration(
            "S3Integration",
            `https://${publicBucket.bucketWebsiteDomainName}`
         );

         const paths = ["/", "/portfolio", "/resume"];
        
         for (const path of paths) {
            httpApi.addRoutes({
            path,
            methods: [apigwyv2.HttpMethod.GET],
            integration: s3Integration,
            });
         }


      const myFunctionURL = filesLambda.addFunctionUrl({
              authType:lambda.FunctionUrlAuthType.NONE
      });
      
      new cdk.CfnOutput(this, 'FunctionURL', {
         value: myFunctionURL.url
      })

      new cdk.CfnOutput(this, "ApiGatewayURL", {
         value: httpApi.apiEndpoint!
      });
   }
}