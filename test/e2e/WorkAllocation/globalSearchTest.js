const testConfig = require('../../../config.js');

Feature('End To End Tests For Global Search');
Scenario(
  'Global Search - Single Params -- England and Wales - Singles',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1712162489211214';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifyAccessToCase();
  },
)
  .tag('@gsearch')
  .tag('@postr1.2')
  .tag('@nightly');
