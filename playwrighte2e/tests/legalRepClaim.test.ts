import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import userDetailsData from '../resources/payload/user-details.json';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Legal Representative submits a case and perform various events', () => {
  test(
    'LR creates a claim, amend claimant/respondent names and persist NOC with original claimant/respondent names',
    { tag: '@demo' },
    async ({
      page,
      manageCaseDashboardPage,
      caseListPage,
      claimantDetailsPage,
      respondentDetailsPage,
      loginPage,
      legalRepPage,
      et1CreateDraftClaim,
      nocPage,
    }) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      await caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', 'LS1 2AJ');

      await et1CreateDraftClaim.et1Section1(userDetailsData.claimantsFirstName, userDetailsData.claimantsLastName);
      await et1CreateDraftClaim.et1Section2(userDetailsData.respondentsFirstName, userDetailsData.respondentsLastName);
      await et1CreateDraftClaim.et1Section3();
      let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
      caseId = submissionReference.toString();
      console.log('Case Submission Reference ' + submissionReference);
      await caseListPage.signoutButton();

      ({ caseId, caseNumber } = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));

      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      // Amend Claimant and Respondent names
      await caseListPage.selectNextEvent('Claimant Details');
      await claimantDetailsPage.processClaimantDetails();
      await caseListPage.selectNextEvent('Respondent Details');
      await respondentDetailsPage.processRespondentDetails();
      await manageCaseDashboardPage.signOut();

      // Perform NOC using original Claimant and Respondent names (different org)
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etLegalRepresentative2.email,
        config.etLegalRepresentative2.password,
        config.loginPaths.cases,
      );
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(
        caseId,
        `${userDetailsData.respondentsFirstName} ${userDetailsData.respondentsLastName}`,
        caseNumber,
      );
    },
  );
});
