
import { ApplicationTabPage } from '../pages/applicationTabPage';
import CaseListPage from '../pages/caseListPage';
import CreateCaseFlagPage from '../pages/createCaseFlag';
import ManageCaseFlagPage from '../pages/manageCaseFlag';
import Et1CaseServingPage from '../pages/et1CaseServingPage';
import LoginPage from '../pages/loginPage';
import { ListHearingPage } from '../pages/listHearingPage';
import { LegalRepPage } from '../pages/legalRepPage';
import CitizenHubPage from '../pages/citizenHubPage';
import { CaseLinkPage } from '../pages/caseLinkPage';
import RespondentRepPage from '../pages/respondentRepPage';
import ET3LoginPage from '../pages/et3LoginPage';
import RespondentCaseOverviewPage from '../pages/respondentCaseOverviewPage';
import RespondentTaskListPage from '../pages/respondentTaskListPage';
import ResponseLandingPage from '../pages/responseLandingPage';
import RespContactDetailsPages from '../pages/respContactDetailsPages';
import RespClaimantDetails from '../pages/respClaimantDetails';
import RespContestClaim from '../pages/respContestClaim';
import RespSubmitEt3 from '../pages/respSubmitEt3';
import BfActionPage from '../pages/bfActionPage';
import JurisdictionPage from '../pages/jurisdictionPage';
import CaseTransferPage from '../pages/caseTransferPage';
import NotificationPage from '../pages/notificationPage';
import ClaimantDetailsPage from '../pages/claimantDetailsPage';
import RespondentDetailsPage from '../pages/respondentDetailsPage';
import NocPage from '../pages/nocPage';
import { ManageOrgPage } from '../pages/manageOrgPage';
import ICUploadDocPage from '../pages/icUploadDocPage';
import { RestrictedReportingPage } from '../pages/restrictedReportingPage';
import UploadDocumentPage from "../pages/uploadDocumentPage";
import ReferralPage from '../pages/referralPage';
import DraftJudgementPage from '../pages/draftJudgementPage';
import IssueJudgementPage from '../pages/issueJudgementPage';
import SearchAcasPage from '../pages/searchAcasPage';
import LettersPage from '../pages/lettersPage';
import DepositOrderPage from '../pages/depositOrderPage';
import RolesAndAccessPage from "../pages/rolesAndAccessPage";
import TaskPage from "../pages/taskPage";
import HearingDetailsPage from "../pages/hearingDetailsPage";
import AdrDocumentPage from "../pages/adrDocumentPage";

export type PageFixtures = {

    applicationTabPage: ApplicationTabPage;
    caseListPage: CaseListPage;
    createCaseFlagPage: CreateCaseFlagPage;
    manageCaseFlagPage: ManageCaseFlagPage;
    et1CaseServingPage: Et1CaseServingPage;
    loginPage: LoginPage;
    listHearingPage: ListHearingPage;
    legalRepPage: LegalRepPage;
    citizenHubPage: CitizenHubPage;
    caseLinkPage: CaseLinkPage;
    respondentRepPage: RespondentRepPage;
    et3LoginPage: ET3LoginPage;
    respondentCaseOverviewPage: RespondentCaseOverviewPage;
    respondentTaskListPage: RespondentTaskListPage;
    responseLandingPage: ResponseLandingPage;
    respContactDetailsPages: RespContactDetailsPages;
    respClaimantDetails: RespClaimantDetails;
    respContestClaim: RespContestClaim;
    respSubmitEt3: RespSubmitEt3;
    bfActionPage: BfActionPage;
    jurisdictionPage: JurisdictionPage;
    caseTransferPage: CaseTransferPage;
    notificationPage: NotificationPage;
    claimantDetailsPage: ClaimantDetailsPage;
    respondentDetailsPage: RespondentDetailsPage;
    nocPage: NocPage;
    manageOrgPage: ManageOrgPage;
    icUploadDocPage: ICUploadDocPage;
    restrictedReportingPage: RestrictedReportingPage;
    uploadDocumentPage:UploadDocumentPage
    referralPage: ReferralPage;
    draftJudgementPage: DraftJudgementPage;
    issueJudgementPage: IssueJudgementPage;
    searchAcasPage: SearchAcasPage;
    lettersPage: LettersPage;
    depositOrderPage: DepositOrderPage;
    rolesAndAccessPage:RolesAndAccessPage;
    taskPage:TaskPage;
    hearingDetailsPage:HearingDetailsPage;
    adrDocument:AdrDocumentPage;
}

export const pageFixtures = {

    applicationTabPage: async ({ page }, use) => {
        await use(new ApplicationTabPage(page));
    },

    caseListPage: async ({page}, use) => {
        await use(new CaseListPage(page));
    },

    createCaseFlagPage: async ({page}, use) => {
        await use(new CreateCaseFlagPage(page));
    },

    manageCaseFlagPage: async ({page}, use) => {
        await use(new ManageCaseFlagPage(page));
    },

    et1CaseServingPage: async ({page}, use) => {
        await use(new Et1CaseServingPage(page));
    },

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },

    listHearingPage: async ({page}, use) => {
        await use(new ListHearingPage(page));
    },

    legalRepPage: async ({page}, use) => {
        await use(new LegalRepPage(page));
    },

    citizenHubPage: async ({page}, use) => {
        await use(new CitizenHubPage(page));
    },

    caseLinkPage: async ({page}, use) => {
        await use(new CaseLinkPage(page));
    },

    respondentRepPage: async ({page}, use) => {
        await use(new RespondentRepPage(page));
    },

    et3LoginPage: async ({page}, use) => {
        await use(new ET3LoginPage(page));
    },

    respondentCaseOverviewPage: async ({page}, use) => {
        await use(new RespondentCaseOverviewPage(page));
    },

    respondentTaskListPage: async ({page}, use) => {
        await use(new RespondentTaskListPage(page));
    },

    responseLandingPage: async ({page}, use) => {
        await use(new ResponseLandingPage(page));
    },

    respContactDetailsPages: async ({page}, use) => {
        await use(new RespContactDetailsPages(page));
    },

    respClaimantDetails:async ({page}, use) => {
        await use(new RespClaimantDetails(page));
    },

    respContestClaim:async ({page}, use) => {
        await use(new RespContestClaim(page));
    },

    respSubmitEt3:async ({page}, use) => {
        await use(new RespSubmitEt3(page));
    },

    bfActionPage:async ({page}, use) => {
        await use(new BfActionPage(page));
    },

    jurisdictionPage:async ({page}, use) => {
        await use(new JurisdictionPage(page));
    },

    caseTransferPage:async ({page}, use) => {
        await use(new CaseTransferPage(page));
    },

    notificationPage:async ({page}, use) => {
        await use(new NotificationPage(page));
    },

    claimantDetailsPage:async ({page}, use) => {
        await use(new ClaimantDetailsPage(page));
    },

    respondentDetailsPage:async ({page}, use) => {
        await use(new RespondentDetailsPage(page));
    },

    nocPage:async ({page}, use) => {
        await use(new NocPage(page));
    },

    manageOrgPage:async ({page}, use) => {
        await use(new ManageOrgPage(page));
    },

    icUploadDocPage:async ({page}, use) => {
        await use(new ICUploadDocPage(page));
    },

    restrictedReportingPage:async ({page}, use) => {
        await use(new RestrictedReportingPage(page));
    },

    uploadDocumentPage:async ({page}, use)=>{
        await use(new UploadDocumentPage(page));
    },

    referralPage:async ({page}, use)=>{
        await use(new ReferralPage(page));
    },

    draftJudgementPage:async ({page}, use)=>{
        await use(new DraftJudgementPage(page));
    },

    issueJudgementPage:async ({page}, use)=>{
        await use(new IssueJudgementPage(page));
    },

    searchAcasPage:async ({page}, use)=>{
        await use(new SearchAcasPage(page));
    },

    lettersPage:async ({page}, use)=>{
        await use(new LettersPage(page));
    },

    depositOrderPage:async ({page}, use)=>{
        await use(new DepositOrderPage(page));
    },

    rolesAndAccessPage: async ({page}, use)=>{
        await use(new RolesAndAccessPage(page));
    },

    taskPage: async ({page}, use)=>{
        await use(new TaskPage(page));
    },

    hearingDetailsPage: async ({page}, use)=>{
        await use(new HearingDetailsPage(page));
    }
};
