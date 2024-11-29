import { test } from '@playwright/test';
import { params } from '../utils/config';
import Et3LoginPage from '../pages/et3LoginPage';
import RespondentCaseOverviewPage from '../pages/respondentCaseOverviewPage';
import ResponseLandingPage from '../pages/responseLandingPage';
import ResponseTaskListPage from '../pages/respondentTaskListPage';
import RespContactDetailsPages from '../pages/respContactDetailsPages';
import RespClaimantDetails from '../pages/respClaimantDetails';
import RespContestClaim from '../pages/respContestClaim';
import RespSubmitEt3 from '../pages/respSubmitEt3';

let caseId;
let caseNumber;

test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async ({ page }) => {
    // let loginPage = new LoginPage(page);
    // let createCaseThroughApi = new CreateCaseThroughApi(page);
    // let caseListPage = new CaseListPage(page);
    // let et1CaseServingPage = new Et1CaseServingPage(page);
    //
    // caseId = await createCaseThroughApi.processCaseToAcceptedState();
      caseId= '1727781545265105';
    // await page.goto(params.TestUrlForManageCaseAAT);
    // await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
    // caseNumber = await caseListPage.processCaseFromCaseList(caseId);
    caseNumber = '6081224/2024';
    //Accept case
    // await caseListPage.selectNextEvent('Accept/Reject Case');
    // await et1CaseServingPage.processET1CaseServingPages();
      //await caseListPage.signoutButton();
  });

  test('Validate ET3 Form start page', async ({ page }) => {
    let respondentPage = Et3LoginPage.create(page);
    let caseOverviewPage = RespondentCaseOverviewPage.create(page);
    let taskListPage = ResponseTaskListPage.create(page);

    //Assign a claim to respondent
    await respondentPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await respondentPage.replyToNewClaim(caseId);
    await caseOverviewPage.validateRespondentCaseOverviewPage();
    await taskListPage.validateTaskListPage()
  });

  test('Respondent Assign a claim (ET3)', async ({ page }) => {
    let respondentPage = Et3LoginPage.create(page);
    let respondentLandingPage = ResponseLandingPage.create(page);
    let respContactPage = RespContactDetailsPages.create(page);
    let respClaimantDetails = RespClaimantDetails.create(page);
    let respContestClaim = RespContestClaim.create(page);
    let respSubmitEt3 = RespSubmitEt3.create(page);

    //Assign a claim to respondent
    await respondentPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await respondentPage.replyToNewClaim(caseId);
    await respondentLandingPage.startEt3();
    await respContactPage.et3Section1();
    await respClaimantDetails.et3Section2();
    await respContestClaim.et3Section3();
    await respSubmitEt3.submitEt3();
  });
});
