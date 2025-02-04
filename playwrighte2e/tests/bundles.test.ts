import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from '../pages/caseListPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import CitizenHubPage from '../pages/citizenHubPage';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';

let subRef, submissionRef;
let caseNumber;

test.describe('England - Bundles test', () => {

    let loginPage: LoginPage;
    let createCaseThroughApi: CreateCaseThroughApi;
    let caseListPage: CaseListPage;
    let et1CaseServingPage: Et1CaseServingPage;
    let listHearingPage: ListHearingPage;
    let legalRepPage: LegalRepPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        listHearingPage = new ListHearingPage(page);
        legalRepPage = new LegalRepPage(page);
    
        submissionRef = await createCaseThroughApi.processCaseToAcceptedState("England", "ET_EnglandWales");
        subRef = submissionRef.toString();
    
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionRef.toString());
        caseNumber = await caseListPage.processCaseFromCaseList();
    
        //Accept case
        await caseListPage.selectNextEvent('Accept/Reject Case');
        await et1CaseServingPage.processET1CaseServingPages();
    
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

    test('Bundles - Claimant Submitting hearing preparation document - England', async ({ page }) => {
        let loginPage = new LoginPage(page);
        let caseListPage = new CaseListPage(page);
        let listHearingPage = new ListHearingPage(page);
        let legalRepPage = new LegalRepPage(page);
        let et1CaseServingPage = new Et1CaseServingPage(page);
        let citizenHubPage = new CitizenHubPage(page);

        // await page.goto('/');
        // await loginPage.processPreLoginPagesForTheDraftApplication(postcode);
        // await loginPage.processLoginWithNewAccount();
        // await taskListPage.processPostLoginPagesForTheDraftApplication();
        // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
        // await employmentAndRespondentDetailsPage.processStillWorkingJourney(workPostcode, selectedWorkAddress, firstLineOfAddress);
        // await claimDetailsPage.processClaimDetails();
        // const submissionReference = await submitClaimPage.submitClaim();

        // await page.goto(testConfig.TestUrlForManageCaseAAT);
        // await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
        // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
        // const caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);

        // await caseListPage.selectNextEvent('ET1 case vetting');
        // await et1VettingPages.processET1CaseVettingPages(caseNumber);

        // await caseListPage.selectNextEvent('Accept/Reject Case');
        // await et1CaseServingPage.processET1CaseServingPages(caseNumber);
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

test.describe('Scotland - Bundles test', () => {


    let loginPage: LoginPage;
    let createCaseThroughApi: CreateCaseThroughApi;
    let caseListPage: CaseListPage;
    let et1CaseServingPage: Et1CaseServingPage;
    let legalRepPage: LegalRepPage;
    let listHearingPage: ListHearingPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        legalRepPage = new LegalRepPage(page);
        listHearingPage = new ListHearingPage(page);
    
        submissionRef = await createCaseThroughApi.processCaseToAcceptedState("Scotland", "ET_Scotland");
        subRef = submissionRef.toString();
    
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();
    
        //Accept case
        await caseListPage.selectNextEvent('Accept/Reject Case');
        await et1CaseServingPage.processET1CaseServingPages();
    
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
