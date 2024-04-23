const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

Feature('End To End Test -Case Linking  Multiples ');
Scenario(
  'Link-2-English-Cases - Multiple Reasons - EnW',
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
    referralPages,
  }) => {
    //case 1
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
    I.click('Sign out');
    // case 2
    I.amOnPage('/', 20);
    I.clearCookie();
    I.refreshPage();
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
    let submissionReference2 = await submitClaimPage.submitClaim();
    I.click('Sign out');
    //manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // process cases number 2
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber2 = await caseListPage.processCaseFromCaseList(submissionReference2);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber2);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber2);

    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(
      testConfig.TestEnvAdminETManageCaseUser,
      testConfig.TestEnvAdminETManageCasePassword,
    );

    await caseListPage.createMutipleCase('Eng/Wales - Multiples');
    await caseListPage.createMutiple('Auto Test', 'Leeds');
    await caseListPage.assignLeadCase(caseNumber2);
    I.see('Multiple Number');

    // 2) come to referrals Tab and create a referal and review /close the referral (send/update and close)
    await referralPages.submitAreferral(
      testConfig.TestEnvETHearingJudgeUserEng,
      'Judge',
      'Test referral to a judge',
      'Yes',
      1,
    );
    I.click('[type="submit"]');
    await referralPages.reviewReferral('Admin', testConfig.TestEnvETAdminUserEng);
    I.click('Sign out');
  },
).tag('@MutiplesEnW');
