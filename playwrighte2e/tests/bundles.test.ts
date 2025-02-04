import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from '../pages/caseListPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

const setupTest = async (page, region, caseType) => {
    const loginPage = new LoginPage(page);
    const createCaseThroughApi = new CreateCaseThroughApi(page);
    const caseListPage = new CaseListPage(page);
    const et1CaseServingPage = new Et1CaseServingPage(page);
    const listHearingPage = new ListHearingPage(page);
    const legalRepPage = new LegalRepPage(page);

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

    return { loginPage, caseListPage, et1CaseServingPage, listHearingPage, legalRepPage };
};

test.describe('England - Bundles test',() => {
    let loginPage, caseListPage, et1CaseServingPage, listHearingPage, legalRepPage;

    test.beforeEach(async ({ page }) => {
        ({ loginPage, caseListPage, et1CaseServingPage, listHearingPage, legalRepPage } = await setupTest(page, "England", "ET_EnglandWales"));
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales');
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);

        await caseListPage.selectNextEvent('Upload documents for hearing');
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
        await legalRepPage.verifyHearingDocumentTabLegalRep();
    });
});

test.describe('Scotland - Bundles test', () => {
    let loginPage, caseListPage, et1CaseServingPage, listHearingPage, legalRepPage;

    test.beforeEach(async ({ page }) => {
        ({ loginPage, caseListPage, et1CaseServingPage, listHearingPage, legalRepPage } = await setupTest(page, "Scotland", "ET_Scotland"));
    });

    test('Bundles - Legal rep submit hearing preparation document - Scotland', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('Scotland');
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Scotland - Singles', subRef, respondentName, firstName, lastName);

        await caseListPage.selectNextEvent('Upload documents for hearing');
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
        await legalRepPage.verifyHearingDocumentTabLegalRep();
    });
});
