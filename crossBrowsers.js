/* eslint-disable no-process-env */

const config = require('config');

const supportedBrowsers = require('./test/e2e/crossbrowsers');

const evidenceUploadEnabled = config.get('features.evidenceUpload.enabled');

const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME || config.get('saucelabs.username'),
  accessKey: process.env.SAUCE_ACCESS_KEY || config.get('saucelabs.key'),
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
  tests: './test/*_test.js',
  output: config.get('saucelabs.outputDir'),
  features: {
    evidenceUpload: {
      enabled: evidenceUploadEnabled,
    },
  },
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL || config.get('e2e.frontendUrl'),
      browser: process.env.SAUCE_BROWSER || config.get('saucelabs.browser'),
      smartWait: parseInt(config.get('saucelabs.smartWait')),
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {},
    },
    MyHelper: {
      require: './helpers/helper.js',
      url: config.get('e2e.frontendUrl'),
    },
    SauceLabsReportingHelper: { require: './helpers/SauceLabsReportingHelper.js' },
  },
  include: {
    I: './steps_file.js',
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true },
      },
      mochawesome: {
        stdout: './functional-output/console.log',
        options: {
          reportDir: config.get('saucelabs.outputDir'),
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
    // edge: {
    //   browsers: getBrowserConfig('edge'),
    // },
  },
  name: 'Employment Tribunal Crossbrowser Tests',
};

exports.config = setupConfig;
