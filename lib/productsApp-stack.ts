import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class ProductsAppStack extends cdk.Stack {
  readonly productsFetchHandler: lambdaNodejs.NodejsFunction; // Declara uma propriedade para a função Lambda
  readonly productsDdb: dynamodb.Table; // Declara uma propriedade para a tabela DynamoDB

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // Chama o construtor da classe base Stack

    // Cria uma tabela DynamoDB com o nome 'ProductsDdb' e uma chave primária 'id'
    this.productsDdb = new dynamodb.Table(this, 'ProductsDdb', {
      tableName: 'ProductsDdb', // Nome da tabela
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Política de remoção (destrói a tabela ao excluir a pilha) default: cdk.RemovalPolicy.RETAIN
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      }, // Chave primária
      billingMode: dynamodb.BillingMode.PROVISIONED, // Modo de cobrança sob demanda
      readCapacity: 1, // Capacidade de leitura provisionada, default: 5
      writeCapacity: 1, // Capacidade de gravação provisionada, default: 5
    });

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
        timeout: cdk.Duration.seconds(10), // Tempo limite de execução da função
        bundling: {
          minify: true, // Minifica o código
          sourceMap: false, // Não gera source maps
        },
        environment: {
          PRODUCTS_DDB_TABLE_NAME: this.productsDdb.tableName, // Variável de ambiente com o nome da tabela DynamoDB
        }, // Variáveis de ambiente para a função Lambda
      }
    );

    // Concede permissão à função Lambda para acessar a tabela DynamoDB
    this.productsDdb.grantReadData(this.productsFetchHandler); // Permissão de leitura na tabela
  }
}
