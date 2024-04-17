const testConfig = require('../../../config.js');
//England
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
//Scotland
const scotPostcode = 'FK15 9ET';
const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
const scotWorkPostcode = 'EH45 9BU';
const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';
const respondentName = 'Henry Marsh';

Feature('End To End Tests For an ET Employment Contract Claim');
Scenario(
  'ECC - Create ECC case and Check Notification on CUI -- Scotland',
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
    citizenHubPages,
    referralPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
    await employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
      scotWorkPostcode,
      scotSelectedWorkAddress,
      scotFirstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
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
    await legalRepNOCPages.processNOC('Scotland - Singles', submissionReference, respondentName, firstName, lastName);
    // submit ET3 response form
    await caseListPage.selectNextEvent('ET3 - Respondent Details');
    await legalRepNOCPages.completeDraftET3ResponseForm();
    await caseListPage.selectNextEvent('Submit ET3 Form');
    await legalRepNOCPages.submitET3ResponseForm();
    I.click('Sign out');
    // caseworker sends notification
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    //await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.findCasewithRefNumber(submissionReference);
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('ecc-notification', 'claimant');
    // Claimant View and Respond to Ecc Notification
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.claimantViewAndRespondToECC();
    // admin send response notification to judge for review
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.findCasewithRefNumber(submissionReference);
    await referralPages.submitAreferral(
      testConfig.TestEnvETHearingJudgeUserEng,
      'Judge',
      'Review Ecc response from claimant and give direction',
      'Yes',
      '2: ET3/ECC',
    );
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('ecc-acceptance', 'claimant');
    // Claimant View Ecc  Acceptance Notification
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.cliamantViewEccAcceptanceNotification();
  },
)
  .tag('@ecc')
  .tag('@eccScot')
  .tag('@nightly');
//.retry(1);

Scenario(
  'ECC - Create ECC case and Check Notification on CUI -- EnglandWales',
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
    citizenHubPages,
    referralPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
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
    // submit ET3 response form
    await caseListPage.selectNextEvent('ET3 - Respondent Details');
    await legalRepNOCPages.completeDraftET3ResponseForm();
    await caseListPage.selectNextEvent('Submit ET3 Form');
    await legalRepNOCPages.submitET3ResponseForm();
    I.click('Sign out');
    // caseworker sends notification
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.findCasewithRefNumber(submissionReference);
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('ecc-notification', 'claimant');
    I.click('Sign out');
    // Claimant View and Respond to Ecc Notification
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.claimantViewAndRespondToECC();
    // refer claimant response to the judge
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.findCasewithRefNumber(submissionReference);
    await referralPages.submitAreferral(
      testConfig.TestEnvETHearingJudgeUserEng,
      'Judge',
      'Review Ecc response from claimant and give direction',
      'Yes',
      '2: ET3/ECC',
    );
    await applicationsTabsPages.selectNotificationLink();
    await sendNotificationPages.sendNotificationLink('ecc-acceptance', 'claimant');
    // Claimant View Ecc  Acceptance Notification
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.cliamantViewEccAcceptanceNotification();
  },
)
  .tag('@ecc')
  .tag('@eccEng')
  .tag('@nightly');
