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

         const filesLambda = new NodejsFunction(this, "PrivateFilesFn", {
            entry: "lambda/privateFiles/index.ts",
            handler: "handler",
            runtime: lambda.Runtime.NODEJS_22_X,
            environment: {
               BUCKET_NAME: privateBucket.bucketName,
               JWT_SECRET: 'some_secret'
            }
         });

         const unlockLambda = new NodejsFunction(this, "UnlockLambda", {
            entry: "lambda/unlock/index.ts",
            handler: "handler",
            memorySize: 512,
            runtime: lambda.Runtime.NODEJS_22_X,
         });

         const sessionStatusLambda = new NodejsFunction(this, "SessionStatusLambda", {
            entry: "lambda/session/index.ts",
            handler: "handler",
            runtime: lambda.Runtime.NODEJS_22_X
         });

         privateBucket.grantRead(filesLambda);

         const publicBucket = new s3.Bucket(this, "PublicBucket", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html",
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
         const unlockLambdaIntegration = new integrations.HttpLambdaIntegration('UnlockIntegration', unlockLambda);
         const sessionStatusLambdaIntegration = new integrations.HttpLambdaIntegration('SessionStatusIntegration', sessionStatusLambda);

         httpApi.addRoutes({
            path: '/api/unlock',
            methods: [apigwyv2.HttpMethod.POST],
            integration: unlockLambdaIntegration
         })

         httpApi.addRoutes({
            path: '/api/session',
            methods: [apigwyv2.HttpMethod.GET],
            integration: sessionStatusLambdaIntegration
         })

         httpApi.addRoutes({
         path: '/files/{proxy+}',
         methods: [apigwyv2.HttpMethod.GET],
         integration: fileLambdaIntegration,
         });

         const staticAssetsURL = publicBucket.bucketWebsiteUrl + "/assets/{proxy}"
         const fontsURL =  publicBucket.bucketWebsiteUrl + "/fonts/{proxy}"
         const staticRootFiles = publicBucket.bucketWebsiteUrl + "/{proxy}"
         
         const s3RootIntegration = new integrations.HttpUrlIntegration(
            "S3RootIntegration",
            staticRootFiles
         );

         const s3FontsIntegration = new integrations.HttpUrlIntegration(
            "S3FontsIntegration",
            fontsURL
         );
         
         const s3AssetsIntegration = new integrations.HttpUrlIntegration(
            "S3AssetsIntegration",
            staticAssetsURL
         );

        httpApi.addRoutes({
         path: "/assets/{proxy}",
         methods: [apigwyv2.HttpMethod.GET],
         integration: s3AssetsIntegration,
         });

         httpApi.addRoutes({
         path: "/fonts/{proxy}",
         methods: [apigwyv2.HttpMethod.GET],
         integration: s3FontsIntegration,
         });

         httpApi.addRoutes({
         path: "/{proxy}",
         methods: [apigwyv2.HttpMethod.GET],
         integration: s3RootIntegration,
         });

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