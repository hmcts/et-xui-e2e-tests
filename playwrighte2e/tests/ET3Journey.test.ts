import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


// let caseId: { toString: () => any; };
let caseNumber: any;
let subRef;

test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

  });

  test('Validate ET3 Form start page and check case sensitivity', async ({ et3LoginPage, respondentCaseOverviewPage, respondentTaskListPage }) => {
    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(subRef, caseNumber);
    await respondentCaseOverviewPage.validateRespondentCaseOverviewPage();
    await respondentTaskListPage.validateTaskListPage();
  });

  test('Respondent Assign a claim (ET3)', async ({ et3LoginPage, responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim, respSubmitEt3 }) => {   
    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(subRef, caseNumber);
    await responseLandingPage.startEt3();
    await respContactDetailsPages.et3Section1();
    await respClaimantDetails.et3Section2();
    await respContestClaim.et3Section3();
    await respSubmitEt3.checkYourAnswers();
  });
});
