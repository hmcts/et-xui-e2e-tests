const supportedBrowsers = require('./test/e2e/crossbrowsers/supportedBrowsers');

//const evidenceUploadEnabled = config.get('features.evidenceUpload.enabled');

const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  acceptSslCerts: true,
  tags: ['ET'],
};

function merge(intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(defaultSauceOptions, candidateCapabilities['sauce:options']);
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities,
      });
    } else {
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  tests: './test/**/**/*_test.js',
  output: './e2e-output',
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net/',
      browser: process.env.SAUCE_BROWSER || '',
      //host: process.env.HOST || 'saucelabs',
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {},
    },
    MyHelper: {
      require: './test/helper.js',
      url: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net/',
    },
    SauceHelper: {
      require: 'codeceptjs-saucehelper',
    },
  },
  include: {
    I: './steps_file.js',
    basePage: './test/pages/basepage.page.js',
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true },
      },
      mochawesome: {
        stdout: './e2e-output/console.log',
        options: {
          reportDir: './e2e-output',
          reportName: 'index',
          inlineAssets: true,
        },
      },
    },
  },
  multiple: {
    chrome: {
      browsers: getBrowserConfig('chrome'),
    },
    firefox: {
      browsers: getBrowserConfig('firefox'),
    },
    safari: {
      browsers: getBrowserConfig('safari'),
    },
  },
  name: 'Employment Tribunal Crossbrowser Tests',
};

exports.config = setupConfig;
