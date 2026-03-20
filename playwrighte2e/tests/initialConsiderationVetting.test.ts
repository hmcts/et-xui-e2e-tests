import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';
import { initial } from 'lodash';

let caseNumber: string;
let caseId: string;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
let userEmail:any;
let userPassword:any;

test.describe('Initial Consideration Enhanced party details and ET1Vetting issues', () => {

  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));

    userEmail = config.etRespondent.email;
    userPassword = config.etRespondent.password;
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
      caseListPage,
      claimantDetailsPage,
      respondentRepPage,
    }) => {
      //Assign a claim to respondent
      await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
      await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
      await responseLandingPage.startEt3();
      await respContactDetailsPages.et3Section1();
      await respClaimantDetails.et3Section2();
      await respContestClaim.et3Section3();
      await respSubmitEt3.checkYourAnswers();
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseListPage.selectNextEvent('Claimant Details');
      await claimantDetailsPage.processClaimantDetailsForIC(true);
      await caseListPage.selectNextEvent('Respondent Details');
      await respondentRepPage.enterRespTypeforIC();
      await caseListPage.selectNextEvent('Initial Consideration');
      await initialConsiderationPage.validateEnhancedAllPartyDetails();
      await initialConsiderationPage.validateET1VettingIssues();
    },
  );
});
