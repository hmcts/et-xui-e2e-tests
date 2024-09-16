import { test, expect } from '@playwright/test';
import {params} from '../utils/config';
import CitizenUiPage from "../pages/citizenUiPage";
import LoginPage from "../pages/loginPage";
import TaskListPage from "../pages/taskListPage";
import PersonalDetailsPage from "../pages/personalDetailsPage";
import EmploymentAndRespDetailsPage from "../pages/employmentAndRespDetailsPage";
import ClaimDetailsPage from "../pages/claimDetailsPage";
import SubmitClaimPage from "../pages/submitClaimPage";
import CaseListPage from "../pages/caseListPage";
import Et1VettingPages from "../pages/et1VettingPages";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import RespondentRepPage from "../pages/respondentRepPage";
import CitizenHubPage from "../pages/citizenHubPage";
import  CreateCaseThroughApi from "../pages/createCaseThroughApi";
import BfActionPage from "../pages/bfActionPage";


const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const firstLineOfAddress = '7, Valley Gardens?';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';


test.describe('Case creation in mange case application', () => {
  test('Create a claim for still working for organisation, submit and process within manage cases', {
    tag: ['@cx', '@smoke']}, async ({ page }) => {
    let citizenUiPage = new CitizenUiPage(page);
    let loginPage = new LoginPage(page);
    let taskListPage = new TaskListPage(page);
    let personalDetailsPage = new PersonalDetailsPage(page);
    let employmentAndRespondentDetailsPage = new EmploymentAndRespDetailsPage(page);
    let claimDetailsPage = new ClaimDetailsPage(page);
    let submitClaimPage = new SubmitClaimPage(page);
    let caseListPage = new CaseListPage(page);
    let et1CaseVettingPage = new Et1VettingPages(page);
    let et1CaseServingPage = new Et1CaseServingPage(page);
    let respondentRepPage = new RespondentRepPage(page);
    let citizenHubPages = new CitizenHubPage(page);

    //Creates claim on Citizen UI
    await page.goto(params.TestUrlCitizenUi);
    await citizenUiPage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    // let submissionReference='1724251050040668';
    await submitClaimPage.signoutButton();

    //Xui- process claim
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // let caseNumber= ' 6020101/2024';
    await caseListPage.verifyCaseDetailsPage(true);

    //ET1Vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPage.processET1CaseVettingPages();
    await caseListPage.verifyCaseDetailsPage(false);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPage.processET1CaseServingPages();

    //add respondent representative
    await caseListPage.selectNextEvent('Respondent Representative');
    await respondentRepPage.addRespondentRepresentative('registered', 'ET Organisation');
    await respondentRepPage.signoutButton();

    //citizenUI- contact tribunal
    await citizenHubPages.processCitizenHubLogin(submissionReference, params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.regAccountContactTribunal('withdraw all or part of my claim');
    await citizenHubPages.rule92Question('yes');
    await citizenHubPages.cyaPageVerification();
  });

});


