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
      browser: 'chromium',
      show: testConfig.TestShowBrowserWindow,
      restart: false,
      timeout: 5000,
      waitForNavigation: 'domcontentloaded',
      waitForTimeout: 10000,
      ignoreHTTPSErrors: true,
      windowSize: '1440x700',
    },
    REST: {
      endpoint: 'https://idam-api.aat.platform.hmcts.net/loginUser',
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
    listHearingPages: './test/pages/listHearing.page.js',
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: true,
          steps: true,
        },
      },
      mochawesome: {
        stdout: `${testConfig.TestReportFolder}/console.log`,
        options: {
          reportDir: `${testConfig.TestReportFolder}`,
          reportFilename: 'report',
        },
      },
      'mocha-junit-reporter': {
        stdout: `${testConfig.TestReportFolder}/console.log`,
        options: {
          mochaFile: `${testConfig.TestReportFolder}/output/result.xml`,
          attachments: true,
        },
      },
    },
    enableStackTrace: true,
  },
  name: 'et-xui-e2e-tests',

  plugins: {
    stepByStepReport: {
      enabled: false,
      fullPageScreenshots: true,
      deleteSuccessful: false,
    },
    heal: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: false,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
