// import { test } from "@playwright/test";
// import LoginPage from "../pages/loginPage";
// import CreateCaseThroughApi from "../pages/createCaseThroughApi";
// import CaseListPage from "../pages/caseListPage";
// import Et1CaseServingPage from "../pages/et1CaseServingPage";
// import { params } from "../utils/config";
// import BfActionPage from "../pages/bfActionPage";
// import RespondentPage from "../pages/respondentPage";
//
// let caseId;
// let caseNumber;
//
// test.describe('ET3/Respondent Journey', () => {
//   test.beforeEach(async ({ page }) => {
//     // let loginPage = new LoginPage(page);
//     // let createCaseThroughApi = new CreateCaseThroughApi(page);
//     // let caseListPage = new CaseListPage(page);
//     // let et1CaseServingPage = new Et1CaseServingPage(page);
//     //
//     // caseId = await createCaseThroughApi.processCaseToAcceptedState();
//       caseId= '1727781545265105';
//     // await page.goto(params.TestUrlForManageCaseAAT);
//     // await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
//     // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId.toString());
//     // caseNumber = await caseListPage.processCaseFromCaseList(caseId);
//     caseNumber = '6081181/2024';
//     //Accept case
//     // await caseListPage.selectNextEvent('Accept/Reject Case');
//     // await et1CaseServingPage.processET1CaseServingPages();
//
//   });
//
//   test('Respondent respond to a claim', async ({ page }) => {
//     let caseListPage = new CaseListPage(page);
//     let respondentPage = new RespondentPage(page);
//
//     //await caseListPage.signoutButton();
//
//     //Respond to a new claim
//     await respondentPage.processRespondentLogin(params.TestEnvETRespondentEmailAddress, params.TestEnvETRespondentPassword);
//     await respondentPage.replyToNewClaim(caseId);
//   });
// });
