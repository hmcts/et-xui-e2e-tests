import { Page } from '@playwright/test';

export class CaseLinkPage {
    readonly page: Page;
    readonly nextButton = '#next-button';
    readonly caseLinkProposeButton = '#propose';
    readonly beforeYouStartCaseLinking = '.govuk-heading-xl';
    readonly caseReferenceField = '[name="width-20"]';
    readonly bailOption = '#CLRC010';
    readonly samePartyOption = '#CLRC003';
    readonly sharedEvidenceOption = '#CLRC008';
    readonly guardianOption = '#CLRC006';
    readonly linkedForHearingOption = '#CLRC017';
    readonly progressedAsPartofLeadCase = '#CLRC016';
    readonly removeLinkedCase = '//a[.="Remove"]';
    readonly submitButton = '//button[@class="button"]';
    readonly checkedLinkedCases = '[name="linkedCases"]';
    readonly cyaBody = '#fieldset-case-data';
    readonly unlinkCasesSuccessMessageAlert = '//div[@class="alert-message"]';

    constructor(page: Page) {
        this.page = page;
    }

    async checksCaseLinkStartingPage() {
        await this.page.waitForSelector(this.nextButton, { timeout: 20000 });
        await this.page.waitForSelector(this.beforeYouStartCaseLinking, { timeout: 10000 });
        await this.page.waitForSelector('text=Before you start');
        await this.page.waitForSelector('text=If a group of linked cases has a lead case, you must start from the lead case.');
        await this.page.waitForSelector('text=If the cases to be linked has no lead, you can start the linking journey from any of those cases.');
        await this.page.click(this.nextButton);
    }

    async enterCaseLinkReferenceWithHearing(submissionReference: string) {
        await this.page.waitForSelector(this.caseLinkProposeButton, { timeout: 10000 });
        await this.page.waitForSelector('text=Enter case reference');
        await this.page.waitForSelector('text=Why should these cases be linked?');
        await this.page.fill(this.caseReferenceField, submissionReference);
        await this.page.check(this.bailOption);
        await this.page.check(this.samePartyOption);
        await this.page.check(this.sharedEvidenceOption);
        await this.page.check(this.guardianOption);
        await this.page.check(this.linkedForHearingOption);
        await this.page.check(this.progressedAsPartofLeadCase);
        await this.page.click(this.caseLinkProposeButton);
        await this.page.click(this.nextButton);
        await this.page.waitForSelector(this.submitButton);
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.submitButton);
    }

    async enterCaseLinkReferenceWithoutHearing(submissionReference: string) {
        await this.page.waitForSelector(this.caseLinkProposeButton, { timeout: 20000 });
        await this.page.waitForSelector('text=Enter case reference');
        await this.page.waitForSelector('text=Why should these cases be linked?');
        await this.page.fill(this.caseReferenceField, submissionReference);
        await this.page.check(this.bailOption);
        await this.page.check(this.samePartyOption);
        await this.page.check(this.sharedEvidenceOption);
        await this.page.check(this.guardianOption);
        await this.page.check(this.progressedAsPartofLeadCase);
        await this.page.click(this.caseLinkProposeButton);
        await this.page.waitForSelector(this.removeLinkedCase, { timeout: 10000 });
        await this.page.fill(this.caseReferenceField, submissionReference);
        await this.page.check(this.bailOption);
        await this.page.check(this.samePartyOption);
        await this.page.check(this.sharedEvidenceOption);
        await this.page.check(this.guardianOption);
        await this.page.check(this.linkedForHearingOption);
        await this.page.check(this.progressedAsPartofLeadCase);
        await this.page.click(this.caseLinkProposeButton);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.nextButton);
        await this.page.waitForSelector(this.submitButton);
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.submitButton);
    }

    async unlinkedCase() {
        await this.page.waitForSelector(this.nextButton);
        await this.page.click(this.nextButton);
        await this.page.waitForSelector(this.checkedLinkedCases);
        await this.page.check(this.checkedLinkedCases);
        await this.page.click(this.nextButton);
        await this.page.waitForSelector(this.cyaBody, { timeout: 15000 });
        await this.page.waitForSelector('text=Check your answers');
        await this.page.waitForSelector('text=Cases to unlink');
        await this.page.click(this.submitButton);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.submitButton);
        await this.page.waitForSelector(this.unlinkCasesSuccessMessageAlert, { timeout: 15000 });
    }
}
