#!/usr/bin/env node
import 'dotenv/config'
import * as cdk from 'aws-cdk-lib/core';
import { RestApiStack } from '../lib/rest-api-stack';

const app = new cdk.App();

new RestApiStack(app, 'RestApiGateway', {
   env: {account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION}
});

