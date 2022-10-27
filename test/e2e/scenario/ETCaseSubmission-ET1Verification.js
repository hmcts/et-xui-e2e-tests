const testConfig = require('../config.js');

Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario('Make Draft Application', async ({ I, basePage, loginPage }) => {
  I.amOnPage('/');
  await basePage.processPreLoginPagesForTheDraftApplication();
  await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
}).tag('@RET-WIP');

Scenario(
  'Login the Manage Case and Submit and ET1 Vetting',
  async ({ I, loginPage, caseListPage, et1CaseVettingPages, et1CaseServingPages }) => {
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUserAAT, testConfig.TestEnvETManageCasePasswordAAT);
    await caseListPage.searchCaseApplicationWithSubmissionReference('2: Object', '1666901323048647');
    let caseNumber = await caseListPage.processCaseFromCaseList();
    console.log('The value of the Case Number ' + caseNumber);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
  },
).tag('@RET-BAT');
