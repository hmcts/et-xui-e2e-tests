import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from '../pages/caseListPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import { ApplicationTabPage } from '../pages/applicationTabPage';
import { params } from "../utils/config";

let subRef: string;
let submissionRef: string;
let caseNumber;

let loginPage: LoginPage;
let createCaseThroughApi: CreateCaseThroughApi;
let caseListPage: CaseListPage;
let et1CaseServingPage: Et1CaseServingPage;
let listHearingPage: ListHearingPage;
let legalRepPage: LegalRepPage;
let applicationTabPage: ApplicationTabPage;

async function setupCase(page, region: string, caseType: string) {
    loginPage = new LoginPage(page);
    createCaseThroughApi = new CreateCaseThroughApi(page);
    caseListPage = new CaseListPage(page);
    et1CaseServingPage = new Et1CaseServingPage(page);
    listHearingPage = new ListHearingPage(page);
    legalRepPage = new LegalRepPage(page);
    applicationTabPage = new ApplicationTabPage(page);

    submissionRef = await createCaseThroughApi.processCaseToAcceptedState(region, caseType);
    subRef = submissionRef.toString();

    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
    await caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, subRef);
    caseNumber = await caseListPage.processCaseFromCaseList();

    // Accept case
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPage.processET1CaseServingPages();
}

test.describe('Case File View', () => {
    test.beforeEach(async ({ page }) => {
        await setupCase(page, "England", "ET_EnglandWales");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - England-Singles', async () => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});

test.describe('Case File View', () => {
    test.beforeEach(async ({ page }) => {
        await setupCase(page, "Scotland", "ET_Scotland");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - Scotland-Singles', async () => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});
