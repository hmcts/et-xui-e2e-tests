module.exports = {
  TestUrl: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.ithc.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || true,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETUser: process.env.TEST_CASE_USERNAME || 'retest1078@testmail.com',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || 'Adventure2019',
  TestEnvETManageCaseUser: process.env.ET_CASEWORKER_USER_NAME || 'caseworker1@hmcts.net',
  TestEnvETManageCasePassword: process.env.ET_CASEWORKER_PASSWORD || 'Nagoya0102',
  TestEnvETLegalRepUser: process.env.TEST_LEGAL_REP_USERNAME || 'sunday.ayeni+legalrep1@hmcts.net',
  TestEnvETLegalRepPassword: process.env.TEST_LEGAL_REP_PASSWORD || 'Nagoya0102',
};
