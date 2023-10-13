exports.config = {
  tests: './*_test.js',
  output: './output',
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
      }
    }
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
  mocha: {},
  name: 'Employment Tribunal FE and XUI E2Ed Xbrowsers Tests'
};
