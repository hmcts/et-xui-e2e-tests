const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const testUrl =  process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net/';

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './test/**/**/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url:testUrl,
      browser: 'chrome',
      host: '127.0.0.1',
      port: 4444,
      windowSize: '1920x1680',
      desiredCapabilities: {
        chromeOptions: {
          args: [ '--headless', '--disable-gpu', '--no-sandbox' ]
        }
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
      reportDir: './output',
      reportFilename: 'testReport',
    },
  },
  name: 'et-ccd-e2e-tests',
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
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone'],
      acceptSslCerts: true,
    },
  },
};
