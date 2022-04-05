# et-ux-ui-e2e-tests
Employment Tribunal UX UI E2E Tests


## Getting Started

### Requirements

To run the application on your pc, please ensure you have the followings:

  * [Node.JS](https://nodejs.org/en/)
  * [yarn](https://yarnpkg.com/)

### Running the application on local environment

Please install the dependencies with the following `cmd`:
```
$ yarn install
```

To run the e2e test, use the following `cmd`:
```
$ yarn run test:fullfunctional
```
The above `cmd` is important because CI pipeline is configured to use the same `cmd` for jenkins job

To run crossbrowser test on local environment, Please visit
  *[saucelab-setup](https://tools.hmcts.net/confluence/display/RQA/Sauce+labs)
  
after setting up the tunnel please run 
```
$ yarn run test:crossbrowser
```

To check any linting issue, please run
```
$ yarn lint
```
