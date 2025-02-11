import {test} from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import CaseListPage from "../pages/caseListPage";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import {ListHearingPage} from "../pages/listHearingPage";
import {LegalRepPage} from "../pages/legalRepPage";
import Et1VettingPage from "../pages/et1VettingPages";
import {params} from "../utils/config";
import CitizenHubPage from "../pages/citizenHubPage";
import createAndAcceptCase from "../pages/createAndAcceptCase";
import applicationPage from "../pages/applicationPage";
import {ApplicationTabPage} from "../pages/applicationTabPage";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

test.describe('Make an application', () => {
    let loginPage: LoginPage;
    let et1CaseServingPage: Et1CaseServingPage;
    let legalRepPage: LegalRepPage;
    let citizenHubPage:CitizenHubPage;
    let caseListPage:CaseListPage;
    let applicationPage:ApplicationTabPage;

    test.beforeEach(async ({ page }) => {
        let createCase= new createAndAcceptCase();
        // subRef = await createCase.setupCaseCui(page);
        subRef = 1739200624766301;
    });

    test('Legal representatives make and application - England', async ({ page }) => {

         citizenHubPage = new CitizenHubPage(page);
         loginPage= new LoginPage(page);
        legalRepPage= new LegalRepPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        caseListPage = new CaseListPage(page);



      // const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        // await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, 'firstName', 'lastName');

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();

        //Claimant Reply to Application from Legal Rep
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.respondToAnApplication();


        //Case Worker Request for additional information (respond to claimant's response)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef.toString());
        caseNumber = await caseListPage.processCaseFromCaseList();
        await applicationPage.respondToAnApplication();

        //claimant see response of respond
        // await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        // await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(submissionRef);

    });

});

