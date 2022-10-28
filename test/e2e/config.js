module.exports = {
  TestUrl: process.env.TEST_E2E_URL || 'https://et-sya.aat.platform.hmcts.net',
  TestUrlForManageCaseAAT: 'https://manage-case.aat.platform.hmcts.net',
  TestShowBrowserWindow: process.env.SHOW_BROWSER_WINDOW || true,
  TestsPathToRun: process.env.E2E_TEST_PATH || './**/*.js',
  TestReportFolder: process.env.E2E_OUTPUT_DIR || './functional-output/reports',
  TestEnvETUser: process.env.TEST_CASE_USERNAME || '',
  TestEnvETPassword: process.env.TEST_CASE_PASSWORD || '',
  TestEnvETManageCaseUserAAT: process.env.TEST_MANAGE_CASE_USERNAME_AAT || '',
  TestEnvETManageCasePasswordAAT: process.env.TEST_MANAGE_CASE_PASSWORD_AAT || '',
  TestRunningEnvironment: process.env.RUNNING_ENV || 'aat',
  TestIDAMEnvironment: process.env.IDAM_ENV || 'aat',
  TestPrNumber: process.env.PR_NUMBER || 'pr-972',
};
