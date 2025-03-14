import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CaseLinkPage extends BasePage {
    
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
    readonly submitButtonLink = '//button[@class="button"]';
    readonly checkedLinkedCases = '[name="linkedCases"]';
    readonly cyaBody = '#fieldset-case-data';
    readonly unlinkCasesSuccessMessageAlert = '//div[@class="alert-message"]';


    async checksCaseLinkStartingPage() {

        await Promise.all([
            await this.webActions.verifyElementContainsText(this.page.locator(this.beforeYouStartCaseLinking), 'Before you start', 10000),
            await this.webActions.waitForElementToBeVisible('text=Before you start'),
            await this.webActions.waitForElementToBeVisible('text=If a group of linked cases has a lead case, you must start from the lead case.'),
            await this.webActions.waitForElementToBeVisible('text=If the cases to be linked has no lead, you can start the linking journey from any of those cases.'),
            await this.delay(3000),
            // await this.page.click(this.nextButton)
            await this.submitButton()
        ]);
    }

    async enterCaseLinkReferenceWithHearing(submissionReference: string) {

        await Promise.all([
            await this.page.waitForSelector(this.caseLinkProposeButton, { timeout: 10000 }),
            await this.page.waitForSelector('text=Enter case reference'),
            await this.page.waitForSelector('text=Why should these cases be linked?'),
            await this.page.fill(this.caseReferenceField, submissionReference),
            await this.page.check(this.bailOption),
            await this.page.check(this.samePartyOption),
            await this.page.check(this.sharedEvidenceOption),
            await this.page.check(this.guardianOption),
            await this.page.check(this.linkedForHearingOption),
            await this.page.check(this.progressedAsPartofLeadCase),
            await this.delay(3000),
            await this.page.click(this.caseLinkProposeButton),
            await this.page.click(this.submitButtonLink),
            await this.page.waitForSelector(this.submitButtonLink),
            await this.page.waitForSelector('text=Check your answers'),
            await this.page.click(this.submitButtonLink)
        ]);   
    }

    async enterCaseLinkReferenceWithoutHearing(submissionReference: string) {
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.caseLinkProposeButton), 20000);
        await this.webActions.waitForElementToBeVisible('text=Enter case reference');
        await this.webActions.waitForElementToBeVisible('text=Why should these cases be linked?');
        await this.webActions.fillField(this.caseReferenceField, submissionReference);
        await this.webActions.checkElementById(this.bailOption);
        await this.webActions.checkElementById(this.samePartyOption);
        await this.webActions.checkElementById(this.sharedEvidenceOption);
        await this.webActions.checkElementById(this.guardianOption);
        await this.webActions.checkElementById(this.progressedAsPartofLeadCase);
        await this.webActions.clickElementByCss(this.caseLinkProposeButton);
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.removeLinkedCase), 10000);
        await this.webActions.fillField(this.caseReferenceField, submissionReference);
        await this.webActions.checkElementById(this.bailOption);
        await this.webActions.checkElementById(this.samePartyOption);
        await this.webActions.checkElementById(this.sharedEvidenceOption);
        await this.webActions.checkElementById(this.guardianOption);
        await this.webActions.checkElementById(this.linkedForHearingOption);
        await this.webActions.checkElementById(this.progressedAsPartofLeadCase);
        await this.webActions.clickElementByCss(this.caseLinkProposeButton);

        await this.page.waitForTimeout(2000);
        await this.page.click(this.submitButtonLink),
        await this.webActions.waitForElementToBeVisible(this.submitButtonLink);
        await this.webActions.waitForElementToBeVisible('text=Check your answers');
        await this.webActions.clickElementByCss(this.submitButtonLink);
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
        await this.page.click(this.submitButtonLink);
        await this.page.waitForTimeout(2000);
        await this.page.click(this.submitButtonLink);
        await this.page.waitForSelector(this.unlinkCasesSuccessMessageAlert, { timeout: 15000 });
    }
}
