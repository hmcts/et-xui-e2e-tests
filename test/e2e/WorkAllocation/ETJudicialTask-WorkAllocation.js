const testConfig = require('../../../config.js');
// Scotland
const scotPostcode = 'FK15 9ET';
const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
const scotWorkPostcode = 'EH45 9BU';
const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';

// England&Wales
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

Feature('End To End; Work Allocation - Assign a Judge to a case - review referral judicial');
Scenario(
  'Submit a case from Scotland - Assign referral To a Scottish judge - Judge review the referral',
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
    workAllocationTaskPages,
    referralPages,
  }) => {
    I.amOnPage('/');
    //await loginPage.registerNewAccount();
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
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('roles-and-access', submissionReference);
    await caseListPage.allocateRolesToCase('judiciary');
    await caseListPage.completeAddingJudicialRole('hearing judge', 'reserve to another person', 'indefinite', 'dhruv');
    //await caseListPage.verifyWATaskFromTaskTab();
    await caseListPage.selectTab('tasks', submissionReference);
    await workAllocationTaskPages.clickAssignToMeLink('ET1 Vetting');
    //await caseListPage.assignTaskToCaseWorkerFromTaskTab('ET1 Vetting');

    // vet the case
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //Case acceptance or rejection Event
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //await caseListPage.selectTabLink('Referrals', submissionReference);
    await referralPages.submitAreferral(
      testConfig.TestEnvETHearingJudgeUserScot,
      'Judge',
      'Test referral to a judge',
      'Yes',
      1,
    );
    I.click('Sign out');
    I.refreshPage();
    I.wait(10);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserScot, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await referralPages.reviewReferral('Admin', testConfig.TestEnvETAdminUserScot);
  },
).tag('@reviewReferralScot');
//accept the case

Scenario(
  'Submit a case from Scotland - Assign referral To England/Wales judge - Judge review the referral',
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
    workAllocationTaskPages,
    referralPages,
  }) => {
    I.amOnPage('/');
    //await loginPage.registerNewAccount();
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
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('roles-and-access', submissionReference);
    await caseListPage.allocateRolesToCase('judiciary');
    await caseListPage.completeAddingJudicialRole(
      'hearing judge',
      'reserve to another person',
      'indefinite',
      'edward boy',
    );
    //await caseListPage.verifyWATaskFromTaskTab();
    await caseListPage.selectTab('tasks', submissionReference);
    await workAllocationTaskPages.clickAssignToMeLink('ET1 Vetting');
    //await caseListPage.assignTaskToCaseWorkerFromTaskTab('ET1 Vetting');

    // vet the case
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //Case acceptance or rejection Event
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //await caseListPage.selectTabLink('Referrals', submissionReference);
    await referralPages.submitAreferral(
      testConfig.TestEnvETHearingJudgeUserEng,
      'Judge',
      'Test referral to a judge',
      'Yes',
      1,
    );
    I.click('Sign out');
    I.refreshPage();
    I.wait(10);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUserEng, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await referralPages.reviewReferral('Admin', testConfig.TestEnvETAdminUserEng);
  },
).tag('@reviewReferralEng');
