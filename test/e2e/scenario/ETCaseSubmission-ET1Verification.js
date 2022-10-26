const testConfig = require('../config.js');

Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario('Make Draft Application', async ({ I, basePage, loginPage, taskListPage }) => {
  I.amOnPage('/');
  await basePage.processPreLoginPagesForTheDraftApplication();
  await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
  await taskListPage.processPostLoginPagesForTheDraftApplication();
}).tag('@RET-BAT');
