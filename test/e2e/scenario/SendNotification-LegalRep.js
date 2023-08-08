//const applicationsTabsPages = require('../../pages/applicationsTabs.pages.js');
const testConfig = require('../config.js');
// const postcode = 'LS9 9HE';
// const workPostcode = 'LS7 4QE';
// const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
// const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
// const firstLineOfAddress = '7, Valley Gardens?';

Feature('End To End Tests For an ET3  Notification ');
Scenario(
  'Send Notification - Tribunal - Request',
  async ({
    I,
    //basePage,
    loginPage,
    //taskListPage,
    //personalDetailsPage,
    //employmentAndRespondentDetailsPage,
    //claimDetailsPage,
    //submitClaimPage,
    caseListPage,
    //et1CaseVettingPages,
    //et1CaseServingPages,
    citizenHubPages,
    applicationsTabsPages,
    sendNotificationPages,
  }) => {
    I.amOnPage('/', 20);
    // await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   workPostcode,
    //   selectedWorkAddress,
    //   firstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // let submissionReference = await submitClaimPage.submitClaim();
    // //I.click('Sign out');
    const submissionReference = '1690815796919821';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);

    console.log('The value of the Case Number ' + submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    // await caseListPage.selectNextEvent('3: Object'); //Firing the ET1 Event.
    // await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    // await caseListPage.selectNextEvent('4: Object'); //Case acceptance or rejection Event
    // await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    await caseListPage.selectTab('Notifications');
    await applicationsTabsPages.SendNotification();
    await sendNotificationPages.sendNotificationLink('cmo', 'yes', 'Both parties', 'legal officer', 'both');

    I.click('Sign out');
    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.verifySendNotification();
  },
)
  .tag('@RET-TEST-NISH')
  .retry(2);

Scenario(
  'Verify Respond to Notification-ManagementOrder - LegalRep',
  async ({
    I,
    //basePage,
    loginPage,
    //taskListPage,
    //personalDetailsPage,
    //employmentAndRespondentDetailsPage,
    //claimDetailsPage,
    //submitClaimPage,
    caseListPage,
    //et1CaseVettingPages,
    //et1CaseServingPages,
    citizenHubPages,
    applicationsTabsPages,
    //sendNotificationPages,
  }) => {
    I.amOnPage('/', 20);
    // await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   workPostcode,
    //   selectedWorkAddress,
    //   firstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // let submissionReference = await submitClaimPage.submitClaim();
    // //I.click('Sign out');
    const submissionReference = '1690815796919821';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);

    console.log('The value of the Case Number ' + submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    await caseListPage.verifyCaseDetailsPage();
    // await caseListPage.selectNextEvent('3: Object'); //Firing the ET1 Event.
    // await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    // await caseListPage.selectNextEvent('4: Object'); //Case acceptance or rejection Event
    // await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    await caseListPage.selectTab('Judgments, orders & notifications');
    await applicationsTabsPages.respondtoAnOrderOrNotification();

    I.click('Sign out');
    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.verifySendNotification();
  },
);
