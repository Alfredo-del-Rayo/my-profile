#!/usr/bin/env node
import 'dotenv/config'
import * as cdk from 'aws-cdk-lib/core';
import { CdkStack } from '../lib/cdk-stack';
import { PublicS3Stack } from '../lib/public-s3-stack';
import { RestApiStack } from '../lib/rest-api-stack';

const app = new cdk.App();

new CdkStack(app, 'CdkStack', {
  env: {account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION}
});

new RestApiStack(app, 'RestApiGateway', {
   env: {account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION}
});

