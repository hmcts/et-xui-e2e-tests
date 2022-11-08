const testConfig = require('../config.js');

Feature('End To End Tests For an ET Case Submitted in the sya Front end - Did Not Work for Org');
Scenario(
  'Create a claim for DID NOT work for organisation, submit and process within manage cases',
  async ({
    I,
    basePage,
    loginPage,
    taskListPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
    caseListPage,
    et1CaseVettingPages,
    et1CaseServingPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication();
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails();
    await employmentAndRespondentDetailsPage.processDidNotWorkForOrganisationMakingClaimAgainst();
    await claimDetailsPage.processClaimDetails();
    const submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('2: Object', submissionReference);
    I.wait(5);
    let caseNumber = await caseListPage.processCaseFromCaseList();
    console.log('The value of the Case Number ' + caseNumber);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    I.click('Sign out');
    //To be Enabled and Retested after Defect RET-2735 is fixed.
    //await citizenHubPages.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword, submissionReference);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
  },
).tag('@RET-DH');
