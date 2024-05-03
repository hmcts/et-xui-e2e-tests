const testConfig = require('../../../config.js');

Feature('End To End Tests For Specific and Challenged Access');

Scenario(
  'Specific Access -Judicial',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1714571323103627';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserEng, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifySpecificAccessRequest();
  },
)
  .tag('@saJudicial')
  .tag('@specificAccess')
  .tag('@nightly');

Scenario(
  'Specific Access - Legal Officer',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1714571323103627';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalOpsUser, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifySpecificAccessRequest();
  },
)
  .tag('@saLegalOfficer')
  .tag('@specificAccess')
  .tag('@nightly');

Scenario(
  'Challenged  Access -Judicial - Scotland',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1714642809243359';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserScot, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifyChallengedAccessRequest();
  },
)
  .tag('@caJudicial')
  .tag('@challengedAccess')
  .tag('@nightly');

Scenario(
  'Challenged Access -Legal Officer - England',
  async ({ I, loginPage, globalSearchPages }) => {
      let submissionReference = '1714642809243359';
      I.amOnPage(testConfig.TestUrlForManageCaseAAT);
      await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserScot, testConfig.TestEnvETManageCasePassword);
      await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
      await globalSearchPages.verifyChallengedAccessRequest();
  },
)
  .tag('@caJudicial')
  .tag('@challengedAccess')
  .tag('@nightly');

