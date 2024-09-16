import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from "../pages/caseListPage";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import BfActionPage from "../pages/bfActionPage";
import { params } from "../utils/config";

test.describe('Various events in mange case application', () => {

  test('Create a claim and perform B/F action event', async ({ page }) => {

    let loginPage = new LoginPage(page);
    let createCaseThroughApi = new CreateCaseThroughApi(page);
    let caseListPage = new CaseListPage(page);
    let et1CaseServingPage = new Et1CaseServingPage(page);
    let bfActinoPage = new BfActionPage(page);

    let caseId = await createCaseThroughApi.processCaseToAcceptedState();

    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
    await caseListPage.processCaseFromCaseList(caseId);

    //Accept case
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPage.processET1CaseServingPages();

    //BF action
    await caseListPage.selectNextEvent('B/F Action');
    await bfActinoPage.addBfAction();
  });

  // test('Create a claim and perform jurisdiction event', async ({ page }) => {
  //   let loginPage = new LoginPage(page);
  //   let createCaseThroughApi = new CreateCaseThroughApi(page);
  //   let caseListPage = new CaseListPage(page);
  //   let et1CaseServingPage = new Et1CaseServingPage(page);
  //   let bfActinoPage = new BfActionPage(page);
  //
  //   let caseId = await createCaseThroughApi.processCaseToAcceptedState();
  //
  //   await page.goto(params.TestUrlForManageCaseAAT);
  //   await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
  //   await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
  //   await caseListPage.processCaseFromCaseList(caseId);
  //
  //   //Accept case
  //   await caseListPage.selectNextEvent('Accept/Reject Case');
  //   await et1CaseServingPage.processET1CaseServingPages();
  //
  //   //Jurisdiction event
  //   await caseListPage.selectNextEvent('Jurisdiction');


  // });
});
