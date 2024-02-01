Feature('End To End Tests For an ET3  Notification and Case Progression from Citizen Hub');
const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
Scenario(
  'Verify Send Notification Event by Caseworker Outside Application- Verify by Claimant',
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
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
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
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
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
    pause();
  },
).tag('@test101');
//.retry(2);
