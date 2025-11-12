import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello CDK!'),
          }
        }
        `)
      });

      const myFunctionURL = myFunction.addFunctionUrl({
        authType:lambda.FunctionUrlAuthType.NONE
      });

      new cdk.CfnOutput(this, "myFunctionUrlOutput", {
        value: myFunctionURL.url
      });


      
  }
}
