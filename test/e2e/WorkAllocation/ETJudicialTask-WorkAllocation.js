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
           // et1CaseServingPages,
           // respondentRepresentativePage,
           // referralPages,
           workAllocationTaskPages,
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
    //assign the task
    //await caseListPage.selectTab('Tasks');
    //await workAllocationTaskPages.clickAssignToMeLink();
    //await caseListPage.proceedtoWATaskPage();
    // await caseListPage.proceedToAvailableTask();
    //await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All', 'Et1 Vetting', submissionReference, true);
    //await workAllocationTaskPages.verifyWAtaskTabPage(submissionReference);
    await caseListPage.verifyWATaskFromTaskTab();
    // vet the case
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
  })
.tag('@wawip');
//accept the case