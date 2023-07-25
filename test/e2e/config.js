module.exports = {
  TestUrl: process.env.TEST_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.aat.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || false,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETUser: process.env.TEST_CASE_USERNAME || '',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || '',
  TestEnvETManageCaseUser: process.env.ET_CASEWORKER_USER_NAME || '',
  TestEnvETManageCasePassword: process.env.ET_CASEWORKER_PASSWORD || '',
  TestEnvETLegalRepUser: process.env.TEST_LEGAL_REP_USERNAME || '',
  TestEnvETLegalRepPassword: process.env.TEST_LEGAL_REP_PASSWORD || '',
};
