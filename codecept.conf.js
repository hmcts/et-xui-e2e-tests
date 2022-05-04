const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const testUrl =  process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net/';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './test/**/**/*_test.js',
  output: './e2e-output',
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
    reporterOptions: {
      reportDir: './e2e-output',
      reportFilename: 'testReport',
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
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    }
  }
};
