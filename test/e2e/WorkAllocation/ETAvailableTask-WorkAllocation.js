const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

Feature('CTSC Admin Verify Task');
Scenario(
  'Verify CTSC Admin can see created task from Available Task -Assign and Unassign to self',
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
    workAllocationTaskPages,
    et1CaseVettingPages,
  }) => {
    I.amOnPage('/');
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
    // login as cstc admin and check that the case is available under available task
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalOpsUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
     let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    //assign task
    await caseListPage.selectTab('tasks', submissionReference);
    await workAllocationTaskPages.clickAssignToMeLink('ET1 Vetting');

    // await caseListPage.proceedtoWATaskPage();
    // await caseListPage.proceedToAvailableTask();
     //TODO- need fix- how can we find a task from multiple search results
     //await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All', 'Et1 Vetting', submissionReference, true);

    // vet the case
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // TODO- validate case not visible under all work tab
    // await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All', 'Et1 Vetting', submissionReference, false);
  },
)
  .tag('@featureRemovedFromV1')
  .retry(2);
