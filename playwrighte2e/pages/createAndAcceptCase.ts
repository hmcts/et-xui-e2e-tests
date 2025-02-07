import { params } from "../utils/config";
import LoginPage from "./loginPage";
import CreateCaseThroughApi from "./createCaseThroughApi";
import CaseListPage from "./caseListPage";
import Et1CaseServingPage from "./et1CaseServingPage";
import CitizenUiPage from "../pages/citizenUiPage";
import TaskListPage from "../pages/taskListPage";
import PersonalDetailsPage from "../pages/personalDetailsPage";
import EmploymentAndRespDetailsPage from "../pages/employmentAndRespDetailsPage";
import ClaimDetailsPage from "../pages/claimDetailsPage";
import SubmitClaimPage from "../pages/submitClaimPage";
import Et1VettingPages from "../pages/et1VettingPages";
// import Et1VettingPage from '../pages/et1VettingPages';


let subRef: string;
let submissionRef: string;
let caseNumber;

const userDetailsData = require('../data/ui-data/user-details.json');

export default class createAndAcceptCase {

    async setupCaseCreatedViaApi(page, region: string, caseType: string) {

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

        return subRef;
    }

    async setupCUICaseCreatedViaApi(page) {

        let loginPage = new LoginPage(page);
        let createCaseThroughApi = new CreateCaseThroughApi(page);
        let caseListPage = new CaseListPage(page);
        let et1CaseServingPage = new Et1CaseServingPage(page);
        // let listHearingPage = new ListHearingPage(page);
        // let legalRepPage = new LegalRepPage(page);
        let et1VettingPage = new Et1VettingPages(page);
        
        submissionRef = await createCaseThroughApi.processCuiCaseToAcceptedState();
        subRef = submissionRef.toString();
        
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();
        
        // Case vetting
        await caseListPage.selectNextEvent('ET1 case vetting');
        await et1VettingPage.processET1CaseVettingPages();
        
        // Accept case
        await caseListPage.selectNextEvent('Accept/Reject Case');
        await et1CaseServingPage.processET1CaseServingPages();

        return {subRef, caseNumber};
    }

    async createCaseViaCUI(page, region, loginMethod, employmentJourneyMethod) {

      const citizenUiPage = new CitizenUiPage(page);
      const loginPage = new LoginPage(page);
      const taskListPage = new TaskListPage(page);
      const personalDetailsPage = new PersonalDetailsPage(page);
      const employmentAndRespondentDetailsPage = new EmploymentAndRespDetailsPage(page);
      const claimDetailsPage = new ClaimDetailsPage(page);
      const submitClaimPage = new SubmitClaimPage(page);
    
      await page.goto(params.TestUrlCitizenUi);
      await citizenUiPage.processPreLoginPagesForTheDraftApplication(region);
      await loginMethod(loginPage);
      await taskListPage.processPostLoginPagesForTheDraftApplication();
      const location = region === 'EnglandWales' ? 'England' : region;
      await personalDetailsPage.processPersonalDetails(userDetailsData.postcode, location, userDetailsData.addressOption);
      await employmentJourneyMethod(employmentAndRespondentDetailsPage);
      await claimDetailsPage.processClaimDetails();
      const submissionReference = await submitClaimPage.submitClaim();
      await submitClaimPage.signoutButton();
    
      return submissionReference;
    }

    async setupCaseCreatedViaCUI(page, region, submissionReference, loginCredentials) {
      const loginPage = new LoginPage(page);
      const caseListPage = new CaseListPage(page);
      const et1CaseVettingPage = new Et1VettingPages(page);
      const et1CaseServingPage = new Et1CaseServingPage(page);
    
      await page.goto(params.TestUrlForManageCaseAAT);
      await loginPage.processLogin(loginCredentials.user, loginCredentials.password);
      const searchReference = region === 'EnglandWales' ? 'Eng/Wales - Singles' : `${region} - Singles`;
      await caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, submissionReference);
      const caseNumber = await caseListPage.processCaseFromCaseList();
      await caseListPage.verifyCaseDetailsPage(true);
    
      await caseListPage.selectNextEvent('ET1 case vetting');
      await et1CaseVettingPage.processET1CaseVettingPages();
      await caseListPage.verifyCaseDetailsPage(false);
      await caseListPage.selectNextEvent('Accept/Reject Case');
      await et1CaseServingPage.processET1CaseServingPages();
    
      return caseNumber;
    }
}
