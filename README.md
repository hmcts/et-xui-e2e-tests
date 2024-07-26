# et-xui-e2e-tests
Employment Tribunal XUI E2E Tests


## Getting Started

### Requirements

To run the application on your pc, please ensure you have the followings:

  * [Node.JS](https://nodejs.org/en/)
  * [yarn](https://yarnpkg.com/)

### Running the application on local environment
Please note the following before running the e2e test `config.js` must be updated accordingly.
Please install the dependencies with the following `cmd`:
```
$ yarn install
```

To run the e2e test in ui mode, use the following `cmd`:
```
$  yarn playwright test --ui 
```

To debug the e2e test 
```
$  yarn playwright test debug
```
