import LoginPage from "./loginPage";
import CreateCaseThroughApi from "./createCaseThroughApi";
import CaseListPage from "./caseListPage";
import Et1CaseServingPage from "./et1CaseServingPage";
import {params} from "../utils/config";

let subRef: string;
let submissionRef: string;
let caseNumber;

export default class createAndAcceptCase {
    async setupCase(page, region: string, caseType: string) {

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
}
