// add a judge to a case
// assign a task to the judge
// judge complete the task

const testConfig = require('../../../config.js');
const postcode = 'FK15 9ET';
const addressOption = '3e, Station Road, Dunblane, FK15 9ET';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const firstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';

Feature('End To End; Work Allocation - Assign a Judge to a case - review referral judicial');
Scenario(
  'Submit a case from Scotland - Case Admin Submit',
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
    // respondentRepresentativePage,
    // referralPages,
    workAllocationTaskPages,
    referralPages,
  }) => {
    I.amOnPage('/');
    //await loginPage.registerNewAccount();
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETCstcAdminUser, testConfig.TestEnvETCstcAdminPassword);
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
    await referralPages.submitAreferral('dhruv.nolan@justice.gov.uk', 'Judge', 'Test referral to a judge', 'Yes', 1);
    I.click('Sign out');
    I.refreshPage();
    I.wait(10);
    await loginPage.processLoginOnXui(testConfig.TestEnvETHearingJudgeUser, testConfig.TestEnvETHearingJudgePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await referralPages.reviewReferral('Admin', 'et-hearing-admin-wa3@justice.gov.uk');
  },
).tag('@wawip');
//accept the case
