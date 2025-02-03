#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppStack } from '../lib/productsApp-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: '692859904222',
  region: 'us-east-1',
};

const tags = {
  cost: 'ecommerce',
};

const productsAppStack = new ProductsAppStack(app, 'ProductsApp', {
  env,
  tags,
});

const eCommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', {
  env,
  tags,
  productsFetchHandler: productsAppStack.productsFetchHandler,
});
eCommerceApiStack.addDependency(productsAppStack);
