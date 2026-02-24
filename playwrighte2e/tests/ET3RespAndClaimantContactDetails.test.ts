import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let subRef: string;

test.describe('ET3/Respondent Journey validates respondent/claimant details', () => {
  test.beforeEach(async ({}) => {
    subRef = await CitizenClaimantFactory.progressCaseFromCreateToEt3(CaseTypeLocation.EnglandAndWales);
  });

  //RET-5516
  test('Citizen user validates respondent contact details', async ({page, loginPage,caseListPage, respondentDetailsPage, citizenHubLoginPage, citizenHubPage }) => {
    //caseworker completes respondent details
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(true);
    await caseListPage.signoutButton();

    //citizen validates respondent contact details
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.clickRespondentContactDetailsLink();
    await citizenHubPage.verifyRespondentContactDetails();
  });

  //RET-5767
  test('Respondent validates claimant contact details', {tag: '@demo'}, async ({ page, loginPage, caseListPage, respondentCaseOverviewPage , et3LoginPage}) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');
    await caseListPage.signoutButton();

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLoginForExistingCase(config.etRespondent.email, config.etRespondent.password, caseNumber);
    await respondentCaseOverviewPage.validateRespondentClaimantContactDetailsPage();
  });
});
