import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


let caseNumber: any;
let subRef;


test.describe('ET3/Respondent Journey validates respondent/claimant details', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    subRef = await createCaseStep.setupCUIcaseVetAndAcceptViaApi(page, true);
  });

  //RET-5516
  test('Citizen user validates respondent contact details', async ({page, loginPage,caseListPage, respondentDetailsPage, citizenHubPage }) => {
    //caseworker completes respondent details
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef.toString());
    caseNumber = await caseListPage.processCaseFromCaseList();

    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(true);
    await caseListPage.signoutButton();

    //citizen validates respondent contact details
    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.clickRespondentContactDetailsLink();
    await citizenHubPage.verifyRespondentContactDetails();
  });

  //RET-5767
  test('Respondent validates claimant contact details', {tag: '@demo'}, async ({ page, loginPage, caseListPage, respondentCaseOverviewPage , et3LoginPage}) => {
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef.toString());
    caseNumber = await caseListPage.processCaseFromCaseList();
    await caseListPage.signoutButton();

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLoginForExistingCase(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
    await respondentCaseOverviewPage.validateRespondentClaimantContactDetailsPage();
  });

});