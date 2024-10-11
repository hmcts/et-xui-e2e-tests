import { expect, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from "../pages/caseListPage";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import BfActionPage from "../pages/bfActionPage";
import { params } from "../utils/config";
import JurisdictionPage from "../pages/jurisdictionPage";
import CaseTransferPage from "../pages/caseTransferPage";

let caseId;
let caseNumber;



test.describe('Various events in mange case application', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage = new LoginPage(page);
    let createCaseThroughApi = new CreateCaseThroughApi(page);
    let caseListPage = new CaseListPage(page);
    let et1CaseServingPage = new Et1CaseServingPage(page);

    caseId = await createCaseThroughApi.processCaseToAcceptedState();

    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
    caseNumber = await caseListPage.processCaseFromCaseList(caseId);

    //Accept case
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPage.processET1CaseServingPages();

  });

  test('Create a claim and perform B/F action event', async ({ page }) => {
    let caseListPage = new CaseListPage(page);
    let bfActinoPage = new BfActionPage(page);

    //BF action
    await caseListPage.selectNextEvent('B/F Action');
    await bfActinoPage.addBfAction();
  });

  test('Create a claim and perform jurisdiction event', async ({ page }) => {
    let caseListPage = new CaseListPage(page);
    let jurisdictionPage = new JurisdictionPage(page);

    //Jurisdiction event
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.addJurisdictionCode();
    await jurisdictionPage.verifyJurisdictionCodeOnTab();
  });

  test('Create a England/Wales claim and transfer to Scotland', async ({ page }) => {
    let caseListPage = new CaseListPage(page);
    let caseTransferPage = new CaseTransferPage(page);
    let loginPage = new LoginPage(page);

    await caseListPage.selectNextEvent('Case Transfer (Scotland)');

    await caseTransferPage.progressCaseTransfer();
    await caseTransferPage.checkYourAnswer(caseNumber);
  });

  test('Judge draft and sign judgement or order for a England/Wales claim ', async ({ page }) => {
    let caseListPage = new CaseListPage(page);
    let loginPage = new LoginPage(page);

   await caseListPage.signoutButton();

   //judge log in
    await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
    await caseListPage.processCaseFromCaseList(caseId);

    await caseListPage.clickTab('Judgments');

  });

});
