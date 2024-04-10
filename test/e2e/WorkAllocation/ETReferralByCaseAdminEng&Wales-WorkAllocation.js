const testConfig = require('../../../config.js');

const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

Feature('End To End; Work Allocation - Submit a Referral ');
Scenario(
  'Submit a case from England & wales - Case Admin Submit and Create ReviewReferralAdmin Task',
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
    listHearingPages,
    respondentRepresentativePage,
    referralPages,
    workAllocationTaskPages,
  }) => {
    I.amOnPage('/');
    await loginPage.registerNewAccount();
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
    // let submissionReference = '1711629366155269';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETCstcAdminUser, testConfig.TestEnvETCstcAdminPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.processCaseFromCaseList(caseNumber);
    //vet the case
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //accept the case
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //List a Hearing for the case
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPages.listCase();
    //Update Hearing
    await caseListPage.selectNextEvent('Hearing Details');
    await listHearingPages.updateHearing();
    // Create ReviewReferralAdmin Task
    await referralPages.submitAreferral(
      'et-hearing-admin-wa1@justice.gov.uk',
      'Admin',
      'Test Referral by Admin',
      'Yes',
      1,
    );

    //assign the task
    await caseListPage.selectTab('tasks', submissionReference);
    await workAllocationTaskPages.clickAssignToMeLink();
    await caseListPage.proceedtoWATaskPage();
    await caseListPage.proceedToAvailableTask();
    await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All', 'Et1 Vetting', submissionReference, true);
    await workAllocationTaskPages.verifyWAtaskTabPage(submissionReference);
    //add org to case to enable cui applications
    await caseListPage.selectNextEvent('Respondent Representative'); //Respondent Representative Event
    await respondentRepresentativePage.addRespondentRepresentative('registered', 'ET Test3 Organisation');
    // //do referral as a admin case worker
    await referralPages.submitAreferral('et.ctscworker010@justice.gov.uk', 'Admin', 'Test Referral by Admin', 'Yes', 1);
  },
).tag('@RET-Nish');
