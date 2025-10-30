import { BaseStep } from "./base";
import { params } from "../utils/config";

export default class JudgementSteps extends BaseStep {

    async createDraftJudgement(subRef: string){

        await this.caseListPage.signoutButton();
        await this.page.goto(params.TestUrlForManageCaseAAT);

        //judge logs in
        await this.loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        await  this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')


        //Create a draft judgement
        await this.caseListPage.navigateToTab('Judgments');
        await this.caseListPage.verifyAndClickLinkInTab('Draft and sign judgment/order');

        await this.draftJudgementPage.submitDraftJudgement();
        await this.caseListPage.navigateToTab('Judgments');
        await this.caseListPage.verifyJudgementDetailsOnTab('Draft and Sign Judgment');
        await this.caseListPage.verifyJudgementDetailsOnTab('Test Draft Judgement');
    }

    async issueJudgement(subRef: string){

        await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await  this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
        await this.caseListPage.selectNextEvent('Judgment');

        await this.issueJudgementPage.issueJudgement();
        await this.caseListPage.navigateToTab('Judgments');
        await this.caseListPage.verifyJudgementDetailsOnTab('DAG');
        await this.caseListPage.verifyJudgementDetailsOnTab('Case Management');
        await this.caseListPage.verifyJudgementDetailsOnTab('1 Jan 2025');
        await this.caseListPage.verifyJudgementDetailsOnTab('2 Jan 2025');
    }
}

