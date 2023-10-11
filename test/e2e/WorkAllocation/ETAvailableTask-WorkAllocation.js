const testConfig = require('../config.js');
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
    // login as cstc admin and check that the case is available under available task
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETCstcAdminUser, testConfig.TestEnvETCstcAdminPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.proceedtoWATaskPage();
    await caseListPage.proceedToAvailableTask();
    await caseListPage.searchTaskFromAllWorkAllLocation('All', 'All','Et1 Vetting')
    await workAllocationTaskPages.verifyWAtaskTabPage(submissionReference);
    // vet the case
    await caseListPage.selectNextEvent('ET1 case vetting'); //Case acceptance or rejection Event
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
  },
)
  .tag('@nightly')
  .retry(2);