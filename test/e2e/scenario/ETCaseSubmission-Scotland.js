const testConfig = require('../config.js');
const postcode = 'FK15 9ET';
const addressOption = '3E, Station Road, Dunblane, FK15 9ET';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress ='Unit 6, Cherry Court, Calvary Park, Peebles, EH45 9BU';
const firstLineOfAddress = 'UNIT 6, CHERRY COURT, CAVALRY PARK';

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
    citizenHubPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    const submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('19: Object', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + caseNumber);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('2: Object'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    I.forceClick('Sign out');
    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    //await citizenHubPages.VerifyFormType();
  },
).tag('@RET-BAT');
