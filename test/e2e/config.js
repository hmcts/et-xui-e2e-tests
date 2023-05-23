module.exports = {
  TestUrl: process.env.TEST_URL || 'https://et-sya.demo.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.demo.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || true,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETUser: process.env.TEST_CASE_USERNAME || 'et.citizen1@hmcts.net',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || 'ZQ78vl&1',
  TestEnvETManageCaseUser: process.env.ET_CASEWORKER_USER_NAME || 'et.caseworker.4@hmcts.net',
  TestEnvETManageCasePassword: process.env.ET_CASEWORKER_PASSWORD || 'eHd7yB%u',
};
