const supportedBrowsers = require('./crossbrowsers/supportedBrowsers');
const browser = process.env.BROWSER_GROUP || 'chrome';
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
  tests: './**/*.js',
  output: './functional-output',
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
      browser,
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {},
    },
    MyHelper: {
      require: './saucelabsHelper.js',
      url: 'https://et-sya.aat.platform.hmcts.net',
    },
  },
  include: {
    I: './steps_file.js',
    basePage: '../pages/basepage.page.js',
    loginPage: '../pages/login.page.js',
    taskListPage: '../pages/taskList.page.js',
    personalDetailsPage: '../pages/personalDetails.page.js',
    employmentAndRespondentDetailsPage: '../pages/employmentAndRespondentDetails.page.js',
    claimDetailsPage: '../pages/claimDetail.page.js',
    submitClaimPage: '../pages/submitClaim.page.js',
    caseListPage: '../pages/caselist.page.js',
    et1CaseVettingPages: '../pages/et1casevetting.pages.js',
    et1CaseServingPages: '../pages/et1caseserving.pages.js',
    citizenHubPages: '../pages/citizenhub.pages.js',
    judgementCollectionPage: '../pages/judgementCollection.page.js',
    et3NotificationPages: '../pages/et3Notification.pages.js',
    respondentRepresentativePage: '../pages/respondentRepresentative.pages.js',
    referralPages: '../pages/referrals.pages.js',
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          steps: true,
        },
      },
      mochawesome: {
        stdout: './functional-output/console.log',
        options: {
          reportDir: './functional-output',
          reportName: 'index',
          reportTitle: 'Crossbrowser results for: ' + browser.toUpperCase(),
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
    /*safari: {
      browsers: getBrowserConfig('safari'),
    },*/
  },
  name: 'Employment Tribunal Front End and XUI  End To End Crossbrowser Tests',
};

exports.config = setupConfig;
