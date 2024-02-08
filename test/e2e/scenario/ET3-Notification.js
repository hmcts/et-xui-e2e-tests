Feature('End To End Tests For an ET3  Notification and Case Progression from Citizen Hub');
const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
Scenario(
  'Verify ET3 Notification Banner -For Acknowledgment of Claim',
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
    et3NotificationPages,
  }) => {
    I.amOnPage('/');
    await loginPage.registerNewAccount();
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    //I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + caseNumber);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    await caseListPage.selectNextEvent('9: Object'); //ET3NotificationEvent
    await et3NotificationPages.uploadET3acceptanceLetter('single document');
    I.click('Sign out');
    await citizenHubPages.processCitizenHubLogin(
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.verifyET3RespondentResponseonCUI();
  },
)
  .tag('@nightly')
  .tag('@postr1.2')
  .retry(1);
