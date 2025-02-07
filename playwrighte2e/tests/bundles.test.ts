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
import createAndAcceptCase from "../pages/createAndAcceptCase";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

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
    let et1CaseServingPage;
    let createCase;

    test.beforeEach(async ({ page }) => {
        createCase = new createAndAcceptCase();
        et1CaseServingPage = new Et1CaseServingPage(page);
        subRef = await createCase.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await submitHearingPreparationDocument(page, 'EnglandWales', subRef, respondentName, firstName, lastName);
    });
});

test.describe('Scotland - Caseworker Bundles test', () => {
    let et1CaseServingPage;
    let createCase;

    test.beforeEach(async ({ page }) => {
        createCase = new createAndAcceptCase();
        et1CaseServingPage = new Et1CaseServingPage(page);
        subRef = await createCase.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland");
    });

    test('Bundles - Legal rep submit hearing preparation document - Scotland', async ({ page }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await submitHearingPreparationDocument(page, 'Scotland', subRef, respondentName, firstName, lastName);
    });
});

test.describe('England - Claimant Bundles test', () => {
    let loginPage: LoginPage;
    let caseListPage: CaseListPage;
    let et1CaseServingPage: Et1CaseServingPage;
    let listHearingPage: ListHearingPage;
    let legalRepPage: LegalRepPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        listHearingPage = new ListHearingPage(page);
        legalRepPage = new LegalRepPage(page);
        

        let createCase = new createAndAcceptCase();
        ({subRef, caseNumber} = await createCase.setupCUICaseCreatedViaApi(page));
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
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.verifyCitizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.regAccountContactTribunal('submit document for hearing');
        await citizenHubPage.submitDocumentForHearingClaimant();
    });

});


