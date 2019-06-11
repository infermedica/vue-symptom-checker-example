# Vue Symptom Checker Example
This is an example of symptom checker app based on Vue framework.
Base web app was created with vue-cli, which is built on top of webpack.
App uses Infermedica API supported by Artificial Intelligence to perform symptom analysis.

We created it to provide you with an insight on how to work with the Infermedica API, and how to implement such an appliaction on your own.
Provided application resembles a primary care interview with a doctor and provides you with information about most likely conditions.

The most recent Infermedica API documentation is always available on our [developer portal](https://developer.infermedica.com/docs/introduction).

Do not hesitate to contact us if you need any further [help](mailto:contact@infermedica.com).

## Dependecies

Before proceeding to next steps, please make sure that you have [`node`](https://nodejs.org/en/docs/) installed in your system.
Please refer to the docs to find out the most suitable way depending on your OS.

The project uses `npm` as dependency manager. If you have installed node `npm` is a part of node.

Next steps assume that you have `node` and `npm` installed.

## Getting started

First of all you have to obtain your own app-id and app-key from [developer portal](https://developer.infermedica.com/signup).
You will need to paste these into right fields inside the application.

### Running app as docker image

Start with building your docker image by running below command in local root folder of your application
`docker build -t vue-symptom-checker-example .`

After image is successfully created, run the docker image with command
`docker run -p 8080:80 vue-symptom-checker-example`

### Installing further dependencies with npm

Please go to the root directory of and type in terminal
`npm install`

### Running the app in development mode
`npm start`

### Preparing a production-ready build
`npm run build`

### Lints and fixes files
`npm run lint`