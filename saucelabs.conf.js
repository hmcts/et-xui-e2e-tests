const testConfig = require("./config.js");
exports.config = {
  tests: testConfig.TestsPathToRun,
  output: `${process.cwd()}/${testConfig.TestReportFolder}`,
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
      browser: 'chrome',
      host: 'hub.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
      desiredCapabilities: {
        chromeOptions: {
          // Add any Chrome-specific options here
        },
        firefoxOptions: {
          // Add any Firefox-specific options here
        },
        edgeOptions: {
          // Add any Firefox-specific options here
        },
        safariOptions: {
          // Add any Firefox-specific options here
        },
      }
    }
  },
  multiple: {
    regression: {
      browsers: ['chrome', 'firefox', 'edge', 'safari'],  // List of browsers you want to run in parallel
      windowSize: '1200x900',          // Set desired window size (optional)
      delay: 2000                     // Delay between test starts (optional)
    },
  },
  CustomHelper: {
    require: './saucelabsHelper.js',
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
    caseFlagPages: './test/pages/caseFile.pages.js',
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
  name: 'Employment Tribunal FE and XUI E2Ed Xbrowsers Tests'
};
