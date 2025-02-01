import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductsAppStack extends cdk.Stack {
  readonly productsFetchHandler: lambdaNodejs.NodejsFunction; // Declara uma propriedade para a função Lambda

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // Chama o construtor da classe base Stack

    // Define a função Lambda Node.js
    this.productsFetchHandler = new lambdaNodejs.NodejsFunction(
      this,
      'ProductsFetchFunction', // Nome lógico da função no CDK
      {
        functionName: 'ProductsFetchFunction', // Nome da função Lambda
        entry: 'lambda/products/productsFetchFunction.ts', // Caminho do arquivo de entrada
        runtime: lambda.Runtime.NODEJS_20_X, // Versão do Node.js
        handler: 'handler', // Nome do manipulador da função
        memorySize: 512, // Tamanho da memória em MB
        timeout: cdk.Duration.seconds(5), // Tempo limite de execução da função
        bundling: {
          minify: true, // Minifica o código
          sourceMap: false, // Não gera source maps
        },
      }
    );
  }
}
