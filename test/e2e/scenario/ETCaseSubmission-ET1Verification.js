const testConfig = require('../config.js');

Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario('Make Draft Application', async ({ I, basePage, loginPage }) => {
  I.amOnPage('/');
  await basePage.processPreLoginPagesForTheDraftApplication();
  await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
}).tag('@RET-BAT');
