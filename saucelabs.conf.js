const testConfig = require("./config.js");

exports.config = {
  tests: testConfig.TestsPathToRun,
  output: `${process.cwd()}/${testConfig.TestReportFolder}`,
  helpers: {
    Playwright: {
      url: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
      show: testConfig.TestShowBrowserWindow,
      browser: 'chromium', // This will be overridden
      emulate: {
        viewport: {
          width: 1920,
          height: 1080,
        },
        //userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
      },
    },
  },
  include: {
    I: './test/pages/steps_file.js',
    basePage: './test/pages/basepage.page.js',
    loginPage: './test/pages/login.page.js',
    taskListPage: './test/pages/taskList.page.js',
    personalDetailsPage: './test/pages/personalDetails.page.js',
    employmentAndRespondentDetailsPage: './test/pages/employmentAndRespondentDetails.page.js',
    caseOverviewPage: './test/pages/caseoverview.pages.js',
    claimDetailsPage: './test/pages/claimDetail.page.js',
    submitClaimPage: './test/pages/submitClaim.page.js',
    caseListPage: './test/pages/caselist.page.js',
    et1CaseVettingPages: './test/pages/et1casevetting.pages.js',
    et1CaseServingPages: './test/pages/et1caseserving.pages.js',
    citizenHubPages: './test/pages/citizenhub.pages.js',
    judgementCollectionPage: './test/pages/judgementCollection.page.js',
    makeanApplicationPage: './test/pages/application.page.js',
    et3NotificationPages: './test/pages/et3Notification.pages.js',
    applicationsTabsPages: './test/pages/applicationsTabs.pages.js',
    sendNotificationPages: './test/pages/sendNotification.pages.js',
    legalRepNOCPages: './test/pages/legalRep.pages.js',
    respondentRepresentativePage: './test/pages/respondentRepresentative.pages.js',
    referralPages: './test/pages/referrals.pages.js',
    workAllocationTaskPages: './test/pages/waTaskTab.pages.js',
    caseLinkPages: './test/pages/caseLink.pages.js',
    caseFlagPages: './test/pages/caseFlag.pages.js',
    globalSearchPages: './test/pages/globalsearch.pages.js',
  },
  bootstrap: null,
  mocha: {
    "reporterOptions": {
      "codeceptjs-cli-reporter": {
        "stdout": "-",
        "options": {
          "verbose": true,
          "steps": true,
        }
      },
      "mochawesome": {
        "stdout": `${testConfig.TestReportFolder}/console.log`,
        "options": {
          "reportDir":`${testConfig.TestReportFolder}`,
          "reportFilename": "report"
        }
      },
      "mocha-junit-reporter": {
        "stdout": `${testConfig.TestReportFolder}/console.log`,
        "options": {
          "mochaFile": `${testConfig.TestReportFolder}/output/result.xml`,
          "attachments": true
        }
      }
    }
  },
  name: 'ET-E2E Test',
  plugins: {
    saucelabs: {
      enabled: true,
      require: 'codeceptjs-saucelabs',
      username:  process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      hostname: 'ondemand.eu-central-1.saucelabs.com',
      region: 'eu-central-1',
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
      acceptSslCerts: true,
      tags: ['ET-E2E'],
      browsers: [
        {
          browserName: 'firefox',
          browserVersion: 'latest',
          platformName: 'Windows 10',
        },
        {
          browserName: 'firefox',
          browserVersion: 'latest',
          platformName: 'Windows 10',
        },
        {
          browserName: 'MicrosoftEdge',
          browserVersion: 'latest',
          platformName: 'macOS 13',
        },
        {
          browserName: 'safari',
          browserVersion: 'latest',
          platformName: 'macOS 13',
        }

      ],
    },
  },
};
