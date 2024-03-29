const testConfig = require('../../../config.js');
const postcode = 'FK15 9ET';
const addressOption = '3e, Station Road, Dunblane, FK15 9ET';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const firstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';
const respondentName = 'Henry Marsh';

Feature('End To End Tests For an ET Case progression with NOC and response to Tribunal request');
Scenario(
  'Case Progression - assign case to legal rep and respond to tribunal -- legal rep',
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
    legalRepNOCPages,
    applicationsTabsPages,
    sendNotificationPages,
  }) => {
    I.amOnPage('/');
    await loginPage.registerNewAccount();
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + caseNumber);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    const { firstName, lastName } = await et1CaseServingPages.getClaimantFirstName();
    I.click('Sign out');
    //NOC to assign a solicitor
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC('Eng/Wales - Singles', submissionReference, respondentName, firstName, lastName);
    I.click('Sign out');
    I.wait(5);
    // caseworker sends notification
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.verifyCaseDetailsPage();
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('cmo', 'yes', 'Both parties', 'legal officer', 'claimant');

    I.click('Sign out');
    // //Case progression  -- applicant to respond to tribunal request
    // await citizenHubPages.processCitizenHubLogin(
    //   testConfig.TestEnvETUser,
    //   testConfig.TestEnvETPassword,
    //   submissionReference,
    // );
    // await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    // await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    // await citizenHubPages.regAccountContactTribunal('withdraw all or part of my claim');
    // await citizenHubPages.rule92Question('yes');
    // await citizenHubPages.cyaPageVerification();

    // legal rep respond to notification
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.verifyCaseDetailsPage();
    await legalRepNOCPages.respondToNotificationFromTribunal();
  },
)
  .tag('@legalRepTSE')
  .tag('@nightly');
//.retry(1);
