import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from "../pages/caseListPage";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import { params } from "../utils/config";
import BfActionPage from "../pages/bfActionPage";
import Et3LoginPage from "../pages/et3LoginPage";
import RespondentCaseOverviewPage from "../pages/respondentCaseOverviewPage";
import responseLandingPage from "../pages/responseLandingPage";
import responseTaskListPage from "../pages/respondentTaskListPage";
import RespContactDetailsPages from "../pages/respContactDetailsPages";

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
    let respondentPage = new Et3LoginPage(page);
    let caseOverviewPage = new RespondentCaseOverviewPage(page);
    let taskListPage = new responseTaskListPage(page);

    //Assign a claim to respondent
    await respondentPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await respondentPage.replyToNewClaim(caseId);
    await caseOverviewPage.validateRespondentCaseOverviewPage();
    await taskListPage.validateTaskListPage()
  });

  test('Respondent Assign a claim (ET3)', async ({ page }) => {
    let respondentPage = new Et3LoginPage(page);
    let respondentLandingPage = new responseLandingPage(page);
    let taskListPage = new responseTaskListPage(page);
    let respContactPage = new RespContactDetailsPages(page);

    //Assign a claim to respondent
    await respondentPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await respondentPage.replyToNewClaim(caseId);
    await respondentLandingPage.startEt3();
    await respContactPage.et3Section1();
  });
});
