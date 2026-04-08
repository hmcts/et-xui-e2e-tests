import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';
import { initial } from 'lodash';
import CaseDetailsPage from '../pages/caseDetailsPage.ts';

let caseNumber: string;
let caseId: string;

test.describe('Initial Consideration Enhanced party details and ET1Vetting issues', () => {

  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  });

  test(
    'Enhanced party details and ET1Vetting issues',
    { tag: '@demo' },
    async ({
      et3LoginPage,
      responseLandingPage,
      respContactDetailsPages,
      respClaimantDetails,
      respContestClaim,
      respSubmitEt3,
      manageCaseDashboardPage,
      loginPage,
      initialConsiderationPage,
      claimantDetailsPage,
      respondentRepPage, caseDetailsPage
    }) => {
      //Assign a claim to respondent
      await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
      await et3LoginPage.replyToNewClaim(caseId, caseNumber, CaseDetailsValues.respondentName, CaseDetailsValues.claimantFirstName, CaseDetailsValues.claimantLastName);
      await responseLandingPage.startEt3();
      await respContactDetailsPages.et3Section1();
      await respClaimantDetails.et3Section2();
      await respContestClaim.et3Section3();
      await respSubmitEt3.checkYourAnswers();
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseDetailsPage.selectNextEvent(Events.claimantDetails);
      await claimantDetailsPage.processClaimantDetailsForIC(true);
      await caseDetailsPage.selectNextEvent(Events.respondentDetails);
      await respondentRepPage.enterRespTypeforIC();
      await caseDetailsPage.selectNextEvent(Events.initialConsideration);
      await initialConsiderationPage.validateEnhancedAllPartyDetails();
      await initialConsiderationPage.validateET1VettingIssues();
    },
  );
});
