import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CaseListPage from '../pages/caseListPage';
import Et1CreateDraftClaim from '../pages/et1CreateDraftClaim';
import {params} from '../utils/config';
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import NotificationPage from "../pages/notificationPage";
import Et1VettingPages from "../pages/et1VettingPages";
import ClaimantDetailsPage from "../pages/claimantDetailsPage";
import RespondentDetailsPage from "../pages/respondentDetailsPage";
import NocPage from "../pages/nocPage";


const postcode = 'LS1 2AJ';
const claimantsFirstName = 'Jessamine';
const claimantsLastName= 'Malcom';
const respondentsFirstName= 'Mark';
const respondentsLastName = 'McDonald';

test.describe('Legal Representative submits a case and perform various events', () => {
        test('Claimant Representative creates a claim (England and Wales - Singles) and submit', async ({ page }) => {
            let loginPage = new LoginPage(page);
            let caseListPage = new CaseListPage(page);
            let et1CreateDraftClaim = new Et1CreateDraftClaim(page);
            //let applicationPage = new ApplicationPage(page);


            await page.goto(params.TestUrlForManageCaseAAT);
            await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
            await caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', postcode);

            await et1CreateDraftClaim.et1Section1(claimantsFirstName, claimantsLastName);
            await et1CreateDraftClaim.et1Section2(respondentsFirstName, respondentsLastName);
            await et1CreateDraftClaim.et1Section3();
            let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
            console.log('The value of the Case Number ' + submissionReference);

            //Legal rep makes an application- R92 Yes (offline scenario -only claimant rep is online user)
            //RET-5191&92
            // await applicationPage.clickApplicationTab();
            // await applicationPage.navigateMakeAnApplicationLink();
            // await applicationPage.makeAnApplicationR92WithYesOption('Yes');
            //
            // //Legal rep makes an application- R92 No
            // await applicationPage.clickApplicationTab();
            // await applicationPage.navigateMakeAnApplicationLink();
            // await applicationPage.makeAnApplicationR92WithYesOption('No');

            //TODO NOC-5188, 5190...

            // await page.goto(params.TestUrlForManageCaseAAT);
            // await loginPage.processLoginOnXui(params.TestEnvETLegalRepUserDiffOrg, params.TestEnvETLegalRepPasswordDiffOrg);

        });


    test('CR creates a claim, amend claimant/respondent names and persist NOC with original claimant/respondent names', async ({ page }) => {
        let loginPage = new LoginPage(page);
        let caseListPage = new CaseListPage(page);
        let et1CreateDraftClaim = new Et1CreateDraftClaim(page);
        let et1CaseServingPage = new Et1CaseServingPage(page);
        let claimantDetailsPage = new ClaimantDetailsPage(page);
        let respondentDetailsPage = new RespondentDetailsPage(page)
        let nocPage = new NocPage(page);
        let et1CaseVettingPage = new Et1VettingPages(page);


        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', postcode);

        await et1CreateDraftClaim.et1Section1(claimantsFirstName, claimantsLastName);
        await et1CreateDraftClaim.et1Section2(respondentsFirstName, respondentsLastName);
        await et1CreateDraftClaim.et1Section3();
        let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
        console.log('The value of the Case Number ' + submissionReference);
        await caseListPage.signoutButton();

        //vet the case
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference.toString());
        let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
        await caseListPage.selectNextEvent('ET1 case vetting');
        await et1CaseVettingPage.processET1CaseVettingPages();

        // Accept case
        await caseListPage.selectNextEvent('Accept/Reject Case');
        await et1CaseServingPage.processET1CaseServingPages();

        //amend Claimant and respondent names
        await caseListPage.selectNextEvent('Claimant Details');
        await claimantDetailsPage.processClaimantDetails();
        await caseListPage.selectNextEvent('Respondent Details');
        await respondentDetailsPage.processRespondentDetails();
        await caseListPage.signoutButton();

        //perform Noc using original claimant respondent names (different org)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETRespondentEmailAddress, params.TestEnvETRespondentPassword);
        await nocPage.processNoc(submissionReference);
    });
});
