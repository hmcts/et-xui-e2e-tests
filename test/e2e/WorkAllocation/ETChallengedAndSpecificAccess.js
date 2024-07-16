const testConfig = require('../../../config.js');

Feature('End To End Tests For Specific and Challenged Access');

Scenario(
  'Specific Access -Judicial England',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1547575901185339';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserEng, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifySpecificAccessRequest();
  },
)
  .tag('@saJudicial')
  .tag('@waAccess')
  .tag('@specificAccess')
  .tag('@nightly')
  .retry(1);

Scenario(
  'Specific Access - Legal Officer',
  async ({ I, loginPage, globalSearchPages }) => {
    let submissionReference = '1547575901185339';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalOpsUser, testConfig.TestEnvETManageCasePassword);
    await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
    await globalSearchPages.verifySpecificAccessRequest();
  },
)
  .tag('@saLegalOfficer')
  .tag('@waAccess')
  .tag('@specificAccess')
  .tag('@nightly')
  .retry(1);

// Challenged Access Do not apply to judges as at the time of WA release.
// This sceanrio is for the future RET-4898
// Scenario(
//   'Challenged  Access - Judge from English Scottish case',
//   async ({ I, loginPage, globalSearchPages }) => {
//     let submissionReference = '1714642809243359';
//     I.amOnPage(testConfig.TestUrlForManageCaseAAT);
//     await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserScot, testConfig.TestEnvETManageCasePassword);
//     await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
//     await globalSearchPages.verifyChallengedAccessRequest();
//   },
// )
//   .tag('@caJudicial')
//   .tag('@waAccess')
//   .tag('@challengedAccess')
//   .tag('@nightly');

Scenario(
  'Challenged Access -Legal Officer from Scotland English Case',
  async ({ I, loginPage, globalSearchPages }) => {
      let submissionReference = '1683796198469509';
      I.amOnPage(testConfig.TestUrlForManageCaseAAT);
      await loginPage.processLoginOnXui(testConfig.TestEnvETAdminUserScot, testConfig.TestEnvETManageCasePassword);
      await globalSearchPages.searchingWithOneParam('submission reference', submissionReference);
      await globalSearchPages.verifyChallengedAccessRequest();
  },
)
  .tag('@caLegalOfficer')
  .tag('@waAccess')
  .tag('@challengedAccess')
  .tag('@nightly')
  .retry(1);

