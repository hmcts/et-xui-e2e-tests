import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CaseOverviewPage extends BasePage{

    applicationTab = '#mat-tab-label-0-9';
    applicationDropdown = '#tseAdminSelectApplication';
    decisionForm = '#caseEditForm';
    notificationTitleDecisionPage = '#tseAdminEnterNotificationTitle';
    decisionGranted = '#tseAdminDecision-Granted';
    decisionGrantedInPart = '#tseAdminDecision-Granted in part';
    decisionRefused = '#tseAdminDecision-Refused';
    otherDecision = '#tseAdminDecision-Other';
    judgementDecisionType = 'tseAdminTypeOfDecision-Judgment';
    caseManagementDecisionType = '[id="tseAdminTypeOfDecision-Case management order"]';
    additionalDecisionInformation = '#tseAdminAdditionalInformation';
    madeByLegalOfficer = '[id="tseAdminDecisionMadeBy-Legal officer"]';
    isResponseRequired_No = '#tseAdminIsResponseRequired-No';
    madeByAJudge = '#tseAdminDecisionMadeBy-Judge';
    bothParties = '[id="tseAdminSelectPartyNotify-Both parties"]';
    claimantOnly = '[id="tseAdminSelectPartyNotify-Claimant only"]';
    respondentOnly = '[id="tseAdminSelectPartyNotify-Respondent only"]';
    fullNameDecisionMaker = '#tseAdminDecisionMadeByFullName';
    confirmSubmission = '#confirmation-body';
    returnToCaseOverview = '//button[@class="button"]';

    async recordAdecisionOnAcase(submissionReference: string, appOption: string, decision: string, decisionType: string, decisionMaker: string, respondingParties: string) {
        const recordDecisionLink = `/cases/case-details/${submissionReference}/trigger/tseAdmin/tseAdmin1`;
        await this.page.click(this.applicationTab);
        await this.page.click(`[href="${recordDecisionLink}"]`);
        await this.page.selectOption(this.applicationDropdown, appOption);
        await this.page.click('text=Continue');
        await this.page.waitForSelector(this.decisionForm, { timeout: 15000 });
        await this.page.fill(this.notificationTitleDecisionPage, 'adding a decision');
        
        switch (decision) {
            case 'granted':
                await this.page.check(this.decisionGranted);
                break;
            case 'granted in part':
                await this.page.check(this.decisionGrantedInPart);
                break;
            case 'refused':
                await this.page.check(this.decisionRefused);
                break;
            case 'other decision':
                await this.page.check(this.otherDecision);
                break;
            default:
                throw new Error('... decision option is invalid');
        }

        switch (decisionType) {
            case 'judgment':
                await this.page.check(this.judgementDecisionType);
                break;
            case 'cmo-responding':
                await this.page.waitForTimeout(2000);
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.check(this.caseManagementDecisionType);
                await this.page.check(this.isResponseRequired_No);
                break;
            case 'cmo-no-response':
                await this.page.waitForTimeout(2000);
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.check(this.caseManagementDecisionType);
                await this.page.check(this.isResponseRequired_No);
                break;
            default:
                throw new Error('... decision type is invalid');
        }

        await this.page.fill(this.additionalDecisionInformation, '...test');

        switch (decisionMaker) {
            case 'legal officer':
                await this.page.check(this.madeByLegalOfficer);
                break;
            case 'judge':
                await this.page.check(this.madeByAJudge);
                break;
            default:
                throw new Error('... please select who made the decision');
        }

        await this.page.fill(this.fullNameDecisionMaker, 'ET Tester');

        switch (respondingParties) {
            case 'both':
                await this.page.check(this.bothParties);
                break;
            case 'claimant only':
                await this.page.check(this.claimantOnly);
                break;
            case 'respondent only':
                await this.page.check(this.respondentOnly);
                break;
            default:
                throw new Error('... please party to respond');
        }

        await this.page.click('text=Continue');
        await this.page.waitForSelector('.form-table', { timeout: 15000 });
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click('text=Submit');
        await this.page.waitForSelector(this.confirmSubmission, { timeout: 15000 });
        await this.page.waitForSelector('text=What happens next');
        await this.page.click(this.returnToCaseOverview);
    }
}
