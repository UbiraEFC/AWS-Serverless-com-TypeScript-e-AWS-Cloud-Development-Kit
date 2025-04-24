# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

# Comandos CDK:

- `cdk bootstrap` - Cria o bucket para armazenar os arquivos do CDK
- `cdk list` - Lista as stacks que serão criadas
- `cdk deploy --all` - Faz o deploy de todas as stacks
- `cdk destroy` - Destrói a stack
- `cdk destroy --all` - Destrói todas as stacks

# Lambda Layer

- O que é um Lambda Layer?
  Um Lambda Layer é um pacote ZIP que contém bibliotecas, dependências ou outros arquivos que podem ser usados por funções Lambda. Ele permite que você compartilhe código entre várias funções e mantenha o tamanho do pacote da função menor.
- Layer e NODEJS_20_X
  Em casos de uso de NodeJs 20.x, devemos informar o `compatibleRuntimes: [lambda.Runtime.NODEJS_20_X]` no construtor do Lambda Layer. Isso garante que o layer seja compatível com a versão do Node.js que estamos usando.
