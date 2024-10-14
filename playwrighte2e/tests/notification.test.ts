import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CaseListPage from '../pages/caseListPage';
import Et1CreateDraftClaim from '../pages/et1CreateDraftClaim';
//import ApplicationPage from "../pages/applicationPage";
import {params} from '../utils/config';
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import NotificationPage from "../pages/notificationPage";
import Et1VettingPages from "../pages/et1VettingPages";


const postcode = 'LS1 2AJ';
const claimantsFirstName = 'Jessamine';
const claimantsLastName= 'Malcom';
const respondentsFirstName= 'Mark';
const respondentsLastName  = 'McDonald';

test.describe('Notifications', () => {
  //RET-5309
  test('Claimant Representative creates a claim and view notification from tribunal', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let caseListPage = new CaseListPage(page);
    let et1CreateDraftClaim = new Et1CreateDraftClaim(page);
     let et1CaseServingPage = new Et1CaseServingPage(page);
     let notificationPage = new NotificationPage(page);

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

    //Accept case
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPage.processET1CaseServingPages();

    //send Notification
    await caseListPage.clickTab('Notifications');
    await notificationPage.sendNotification();
    await caseListPage.signoutButton();

    //view Notification as Legal rep
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference.toString());
    await caseListPage.processCaseFromCaseList(submissionReference);
    await notificationPage.viewNotification();
  });

});
