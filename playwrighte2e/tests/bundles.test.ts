import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from '../pages/caseListPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import Et1VettingPage from '../pages/et1VettingPages';
import CitizenHubPage from '../pages/citizenHubPage';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

const setupTest = async (page, region, caseType) => {
    let loginPage = new LoginPage(page);
    let createCaseThroughApi = new CreateCaseThroughApi(page);
    let caseListPage = new CaseListPage(page);
    let et1CaseServingPage = new Et1CaseServingPage(page);

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
};

const submitHearingPreparationDocument = async (page, region, subRef, respondentName, firstName, lastName) => {
    let loginPage = new LoginPage(page);
    let caseListPage = new CaseListPage(page);
    let listHearingPage = new ListHearingPage(page);
    let legalRepPage = new LegalRepPage(page);

    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPage.listCase(region);
    await page.click('text=Sign out');

    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
    await legalRepPage.processNOC(searchReference, subRef, respondentName, firstName, lastName);

    await caseListPage.selectNextEvent('Upload documents for hearing');
    await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
    await legalRepPage.verifyHearingDocumentTabLegalRep();
};

test.describe('England - Caseworker Bundles test', () => {
    let et1CaseServingPage

    test.beforeEach(async ({ page }) => {
        et1CaseServingPage = new Et1CaseServingPage(page);
       await setupTest(page, "England", "ET_EnglandWales");
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await submitHearingPreparationDocument(page, 'EnglandWales', subRef, respondentName, firstName, lastName);
    });
});

test.describe('Scotland - Caseworker Bundles test', () => {
    let et1CaseServingPage;

    test.beforeEach(async ({ page }) => {
        et1CaseServingPage = new Et1CaseServingPage(page);
        await setupTest(page, "Scotland", "ET_Scotland");
    });

    test('Bundles - Legal rep submit hearing preparation document - Scotland', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await submitHearingPreparationDocument(page, 'Scotland', subRef, respondentName, firstName, lastName);
    });
});

test.describe('England - Claimant Bundles test', () => {
    let loginPage: LoginPage;
    let createCaseThroughApi: CreateCaseThroughApi;
    let caseListPage: CaseListPage;
    let et1CaseServingPage: Et1CaseServingPage;
    let listHearingPage: ListHearingPage;
    let legalRepPage: LegalRepPage;
    let et1VettingPages: Et1VettingPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        listHearingPage = new ListHearingPage(page);
        legalRepPage = new LegalRepPage(page);
        et1VettingPages = new Et1VettingPage(page);

        submissionRef = await createCaseThroughApi.processCuiCaseToAcceptedState();
        subRef = submissionRef.toString();

        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();

        // Case vetting
        await caseListPage.selectNextEvent('ET1 case vetting');
        await et1VettingPages.processET1CaseVettingPages();

        // Accept case
        await caseListPage.selectNextEvent('Accept/Reject Case');
        await et1CaseServingPage.processET1CaseServingPages();
    });

    test('Bundles - Claimant Submitting hearing preparation document - England', async ({ page }) => {

        let citizenHubPage = new CitizenHubPage(page);

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales');
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);

        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(submissionRef);
        await citizenHubPage.verifyCitizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.regAccountContactTribunal('submit document for hearing');
        await citizenHubPage.submitDocumentForHearingClaimant();
    });

});


