Feature('End To End Tests For Send Notification Claimant journey');
const testConfig = require('../../../config.js');

const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

//Scotish Details
const scotPostcode = 'FK15 9ET';
const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
const scotWorkPostcode = 'EH45 9BU';
const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';
const respondentName = 'Henry Marsh';

Scenario(
  'Verify Send Notification Event by Caseworker Outside Application -CMO - Claimant verify and reply',
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
    applicationsTabsPages,
    sendNotificationPages,
    respondentRepresentativePage,
  }) => {
    I.amOnPage('/', 20);
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
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    await caseListPage.selectNextEvent('Respondent Representative'); //Adding Respondent Representative
    await respondentRepresentativePage.addRespondentRepresentative('registered', 'ET Organisation');
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('cmo both party to respond legal officer', 'both');

    I.click('Sign out');
    //Claimant respond to Notification
    await citizenHubPages.processCitizenHubLogin(submissionReference);
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.respondToSendNotification('cmo');
  },
)
  .tag('@nightly')
  .tag('@sendCmoNotification')
  .tag('@sendNotification');
//.retry(2);

Scenario( 'Verify Send Notification Event by Caseworker Outside Application - Request - Claimant verify and reply', async ({
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
  applicationsTabsPages,
  sendNotificationPages,
  legalRepNOCPages,
}) => {
  I.amOnPage('/', 20);
  await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
  await loginPage.processLoginWithNewAccount();
  await taskListPage.processPostLoginPagesForTheDraftApplication();
  await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
  await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    scotWorkPostcode,
    scotSelectedWorkAddress,
    scotFirstLineOfAddress,
  );
  await claimDetailsPage.processClaimDetails();
  let submissionReference = await submitClaimPage.submitClaim();
  //I.click('Sign out');
  I.amOnPage(testConfig.TestUrlForManageCaseAAT);
  await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
  await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
  let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
  await caseListPage.verifyCaseDetailsPage();
  await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
  await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
  // Case acceptance or rejection Event
  await caseListPage.selectNextEvent('Accept/Reject Case');
  await et1CaseServingPages.processET1CaseServingPages(caseNumber);
  //send notification to both parties
  await applicationsTabsPages.selectNotificationLink();
  await sendNotificationPages.sendNotificationLink('request claimant respond to caseworker', 'claimant');
  // claimant reply to notification
  await citizenHubPages.processCitizenHubLogin(submissionReference);
  await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
  await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
  await citizenHubPages.respondToSendNotification('request');

})
  .tag('@nightly')
  .tag('@sendReqNotification')
  .tag('@sendNotification')
  .retry(1);
