import LoginPage from "./loginPage";
import CreateCaseThroughApi from "./createCaseThroughApi";
import CaseListPage from "./caseListPage";
import Et1CaseServingPage from "./et1CaseServingPage";
import {params} from "../utils/config";
import {ListHearingPage} from "./listHearingPage";
import {LegalRepPage} from "./legalRepPage";
import Et1VettingPage from "./et1VettingPages";

let subRef: string;
let submissionRef: string;
let caseNumber;

let loginPage: LoginPage;
let createCaseThroughApi: CreateCaseThroughApi;
let caseListPage: CaseListPage;
let et1CaseServingPage: Et1CaseServingPage;
let listHearingPage: ListHearingPage;
let legalRepPage: LegalRepPage;
let et1VettingPages: Et1VettingPage;


export default class createAndAcceptCase {
    //this case is created using ccd api call, case won't be visible in CUI
    async setupCase(page, region: string, caseType: string) {

        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);

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

    //this case is visible in CUI, created through citizen api call
    async setupCaseCui(page){
        loginPage = new LoginPage(page);
        createCaseThroughApi = new CreateCaseThroughApi(page);
        caseListPage = new CaseListPage(page);
        et1CaseServingPage = new Et1CaseServingPage(page);
        listHearingPage = new ListHearingPage(page);
        legalRepPage = new LegalRepPage(page);
        et1VettingPages = new Et1VettingPage(page);

        submissionRef = await createCaseThroughApi.processCuiCaseToAcceptedState();
        subRef = submissionRef.toString();
        //subRef='1739198557603311';

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
        return subRef;
    }
}
