module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: process.env.TEST_MANAGE_CASE_URL || 'https://manage-case.aat.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || true,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',

  TestEnvETUser: process.env.TEST_CASE_USERNAME || '',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || '',
  TestEnvETManageCaseUser: process.env.TEST_MANAGE_CASE_USERNAME || '',
  TestEnvETManageCasePassword: process.env.TEST_MANAGE_CASE_PASSWORD || '',

  TestRunningEnvironment: process.env.RUNNING_ENV || 'aat',
  TestIDAMEnvironment: process.env.IDAM_ENV || 'aat',
  TestPrNumber: process.env.PR_NUMBER || 'pr-972',
};
