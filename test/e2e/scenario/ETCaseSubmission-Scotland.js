const testConfig = require('../config.js');
const postcode = 'FK15 9ET';
const addressOption =
  '{"fullAddress":"3E, STATION ROAD, DUNBLANE, FK15 9ET","street1":"3E, STATION ROAD","street2":"","town":"DUNBLANE","county":"STIRLING","postcode":"FK15 9ET","country":"SCOTLAND"}';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress =
  '{"fullAddress":"UNIT 6, CHERRY COURT, CAVALRY PARK, PEEBLES, EH45 9BU","street1":"UNIT 6, CHERRY COURT, CAVALRY PARK","street2":"","town":"PEEBLES","county":"SCOTTISH BORDERS","postcode":"EH45 9BU","country":"SCOTLAND"}';

Feature('End To End; Tests For Submit a Scottish Case');
Scenario(
  'Submit a case from Scotland - Still working for organisation',
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
    // citizenHubPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(workPostcode, selectedWorkAddress);
    await claimDetailsPage.processClaimDetails();
    const submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('10: Object', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList();
    console.log('The value of the Case Number ' + caseNumber);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    I.click('Sign out');
    /*    await citizenHubPages.processCitizenHubLogin(
          testConfig.TestEnvETUser,
          testConfig.TestEnvETPassword,
          submissionReference,
        );
        await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
        await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
        await citizenHubPages.VerifyFormType();
        */
  },
).tag('@RET-BAT');
