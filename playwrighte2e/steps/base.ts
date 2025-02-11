import CaseListPage from "../pages/caseListPage";
import { LegalRepPage } from "../pages/legalRepPage";
import { ListHearingPage } from "../pages/listHearingPage";
import LoginPage from "../pages/loginPage";
import {Page} from '@playwright/test';
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import Et1CaseServingPage from "../pages/et1CaseServingPage";
import CitizenUiPage from "../pages/citizenUiPage";
import TaskListPage from "../pages/taskListPage";
import PersonalDetailsPage from "../pages/personalDetailsPage";
import EmploymentAndRespDetailsPage from "../pages/employmentAndRespDetailsPage";
import ClaimDetailsPage from "../pages/claimDetailsPage";
import SubmitClaimPage from "../pages/submitClaimPage";
import Et1VettingPages from "../pages/et1VettingPages";
import Et1CreateDraftClaim from "../pages/et1CreateDraftClaim";

export abstract class BaseStep {

    protected loginPage: LoginPage;
    protected caseListPage: CaseListPage;
    protected listHearingPage: ListHearingPage;
    protected legalRepPage: LegalRepPage;
    protected createCaseThroughApi: CreateCaseThroughApi
    protected et1CaseServingPage: Et1CaseServingPage;
    protected et1VettingPage: Et1VettingPages;
    protected citizenUiPage: CitizenUiPage;
    protected taskListPage: TaskListPage;
    protected personalDetailsPage: PersonalDetailsPage;
    protected employmentAndRespondentDetailsPage: EmploymentAndRespDetailsPage;
    protected claimDetailsPage: ClaimDetailsPage;
    protected submitClaimPage: SubmitClaimPage;
    protected et1CreateDraftClaim: Et1CreateDraftClaim;

    constructor(protected page: Page) {
        this.loginPage = new LoginPage(page);
        this.caseListPage = new CaseListPage(page);
        this.listHearingPage = new ListHearingPage(page);
        this.legalRepPage = new LegalRepPage(page);    
        this.createCaseThroughApi = new CreateCaseThroughApi(page);
        this.et1CaseServingPage = new Et1CaseServingPage(page); 
        this.et1VettingPage = new Et1VettingPages(page);      
        this.citizenUiPage = new CitizenUiPage(page); 
        this.taskListPage = new TaskListPage(page);
        this.personalDetailsPage = new PersonalDetailsPage(page);
        this.employmentAndRespondentDetailsPage = new EmploymentAndRespDetailsPage(page);
        this.claimDetailsPage = new ClaimDetailsPage(page);
        this.submitClaimPage = new SubmitClaimPage(page);
        this.et1CreateDraftClaim = new Et1CreateDraftClaim(page);
    }

}