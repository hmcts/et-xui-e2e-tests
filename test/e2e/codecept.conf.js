const { setCommonPlugins } = require('@codeceptjs/configure');

const testConfig = require('./config.js');

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: testConfig.TestsPathToRun,
  output: `${process.cwd()}/${testConfig.TestReportFolder}`,
  helpers: {
    Playwright: {
      url: testConfig.TestUrl,
      show: testConfig.TestShowBrowserWindow,
      restart: false,
      timeout: 5000,
      waitForNavigation: 'domcontentloaded',
      waitForTimeout: 10000,
      ignoreHTTPSErrors: true,
      windowSize: '1920x1080',
    },
    REST: {
      endpoint: 'https://idam-api.aat.platform.hmcts.net/loginUser',
    },
  },
  include: {
    I: './steps_file.js',
    basePage: '../pages/basepage.page.js',
    loginPage: '../pages/login.page.js',
    caseListPage: '../pages/caselist.page.js',
    et1CaseVettingPages: '../pages/et1casevetting.pages.js',
    et1CaseServingPages: '../pages/et1caseserving.pages.js',
    citizenHubPages: '../pages/citizenhub.pages.js',
    judgementCollectionPage: './pages/judgementCollection.page.js',
  },
  bootstrap: null,
  mocha: {
    reporterEnabled: 'codeceptjs-cli-reporter, mochawesome',
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true,
        },
      },
      mochawesome: {
        stdout: './functional-output/e2e/console.log',
        options: {
          includeScreenshots: true,
          reportDir: './functional-output/e2e/reports',
          reportFilename: 'ET-XUI-E2E',
          inline: true,
          html: true,
          json: true,
        },
      },
    },
  },
  name: 'et-xui-e2e-tests',
  multiple: {
    chrome: {
      browsers: ['chrome'],
    },
    firefox: {
      browsers: ['firefox'],
    },
    safari: {
      browsers: ['safari'],
    },
    parallel: {
      chunks: 2,
      browsers: ['chrome', 'firefox', 'safari'],
    },
  },
  plugins: {
    stepByStepReport: {
      enabled: false,
      fullPageScreenshots: true,
      deleteSuccessful: false,
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
