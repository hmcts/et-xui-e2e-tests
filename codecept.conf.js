const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const testUrl =  process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net/';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './test/**/**/*_test.js',
  output: './functional-output/e2e/',
  helpers: {
    Puppeteer: {
      url:testUrl,
      waitForNavigation: 'load',
      getPageTimeout: 60000,
      show: false,
      windowSize: '1000x1000',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
            '--headless',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--allow-running-insecure-content',
            '--ignore-certificate-errors'
        ]
      }

    },
  },
  include: {
    I: './steps_file.js',
    basePage: './test/pages/basepage.page.js',
  },
  bootstrap: null,
  mocha: {
    reporterEnabled: 'codeceptjs-cli-reporter, mochawesome',
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options:{
          verbose: false,
          steps: true
        }
      },
      mochawesome:{
        stdout: './functional-output/e2e/console.log',
        options: {
          includeScreenshots: true,
          reportDir: './functional-output/e2e/reports',
          reportFilename: 'ET-XUI-E2E',
          inline:true,
          html:true,
          json:true
        }
      }

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
    stepByStepReport:{
      enabled: true,
      fullPageScreenshots: true,
      deleteSuccessful: false,
    },
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    }
  }
};
