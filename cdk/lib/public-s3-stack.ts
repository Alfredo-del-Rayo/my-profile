import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class PublicS3Stack extends cdk.Stack {
    public readonly publicBucket: s3.Bucket;
    constructor(scope: Construct, id: string,props?: cdk.StackProps){
        super(scope, id, props);
        
        this.publicBucket = new s3.Bucket(this, 'PublicBucket', {
            publicReadAccess: true,
             blockPublicAccess: {
            blockPublicPolicy: false,
            blockPublicAcls: false,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
        }
        });

        new s3deploy.BucketDeployment(this, 'Deploy-Static-Pages', {
            sources: [s3deploy.Source.asset('./public')],
            destinationBucket: this.publicBucket
        })
    }
}