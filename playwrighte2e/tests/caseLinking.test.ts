import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from '../pages/caseListPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import { CaseLinkPage } from '../pages/caseLinkPage';
import { ApplicationTabPage } from '../pages/applicationTabPage';
import { params } from "../utils/config";


let subRef, subRef2;
let caseNumber1, caseNumber2;

let loginPage: LoginPage;
let createCaseThroughApi: CreateCaseThroughApi;
let caseListPage: CaseListPage;
let et1CaseServingPage: Et1CaseServingPage;
let listHearingPage: ListHearingPage;
let legalRepPage: LegalRepPage;
let applicationTabPage: ApplicationTabPage;
let caseLinkPage: CaseLinkPage;

   async function setUpCase(page, region: string, caseType: string) {
        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        listHearingPage = new ListHearingPage(page);
        legalRepPage = new LegalRepPage(page);
        applicationTabPage = new ApplicationTabPage(page);

        const submissionRef = await createCaseThroughApi.processCaseToAcceptedState(region, caseType);
        const subRef = submissionRef.toString();

        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
        await caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, subRef);
        const caseNumber = await caseListPage.processCaseFromCaseList();

        // Accept case
        await Promise.all([
            await caseListPage.selectNextEvent('Accept/Reject Case'),
            await et1CaseServingPage.processET1CaseServingPages()
        ]);
        

        return { subRef, caseNumber };
    }


    test.describe('Link-2-Scottish-Cases - Multiple Reasons - Scotland', async () => {

        test.beforeEach(async ({ page }) => {
            // Create, vet & accept first case
            ({ subRef, caseNumber: caseNumber1 } = await setUpCase(page, "Scotland", "ET_Scotland"));
            await caseListPage.signoutButton();

            // Create, vet & accept second case
            ({ subRef: subRef2, caseNumber: caseNumber2 } = await setUpCase(page, "Scotland", "ET_Scotland"));
        });

        test('Link-2-Cases - Multiple Reasons - Scotland', async ({ page }) => {
            caseLinkPage = new CaseLinkPage(page);
            // link cases
            await caseListPage.selectNextEvent('Link cases');
            await caseLinkPage.checksCaseLinkStartingPage();
            await caseLinkPage.enterCaseLinkReferenceWithoutHearing(subRef);
        });
    });

    test.describe('Link-2-Cases - Multiple Reasons - England & Wales', async () => {

        test.beforeEach(async ({ page }) => {
            // Create, vet & accept first case
            ({ subRef, caseNumber: caseNumber1 } = await setUpCase(page, "England", "ET_EnglandWales"));
            await caseListPage.signoutButton();

            // Create, vet & accept second case
            ({ subRef: subRef2, caseNumber: caseNumber2 } = await setUpCase(page, "England", "ET_EnglandWales"));
        });

        test('Link-2-Cases - Multiple Reasons - England', async ({ page }) => {
            caseLinkPage = new CaseLinkPage(page);
            // link cases
            await caseListPage.selectNextEvent('Link cases');
            await caseLinkPage.checksCaseLinkStartingPage();
            await caseLinkPage.enterCaseLinkReferenceWithoutHearing(subRef);
        });
    });