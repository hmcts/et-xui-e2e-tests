import { test } from '../fixtures/common.fixture';
import config from '../config/config';

let caseNumber: string;
let subRef: string;

test.describe('ET3/Respondent Journey validates respondent/claimant details', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    subRef = await createCaseStep.setupCUIcaseVetAndAcceptViaApi(true);
  });

  //RET-5516
  test('Citizen user validates respondent contact details', async ({page, loginPage,caseListPage, respondentDetailsPage, citizenHubPage }) => {
    //caseworker completes respondent details
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(true);
    await caseListPage.signoutButton();

    //citizen validates respondent contact details
    await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.clickRespondentContactDetailsLink();
    await citizenHubPage.verifyRespondentContactDetails();
  });

  //RET-5767
  test('Respondent validates claimant contact details', {tag: '@demo'}, async ({ page, loginPage, caseListPage, respondentCaseOverviewPage , et3LoginPage}) => {
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');
    await caseListPage.signoutButton();

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLoginForExistingCase(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
    await respondentCaseOverviewPage.validateRespondentClaimantContactDetailsPage();
  });
});
