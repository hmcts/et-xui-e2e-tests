import { expect, Page } from '@playwright/test';
import {BasePage} from "./basePage";
export default class RespondentCaseOverviewPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public static create(page: Page): RespondentCaseOverviewPage {
        return new RespondentCaseOverviewPage(page);
    }

    elements={
       et1FormLink:this.page.locator('[href="/claimant-et1-form?lng=en"]'),
        et1FormSubLink:this.page.locator('[href="/claimant-et1-form-details?lng=en"]'),

    };
    async validateRespondentCaseOverviewPage() {
        //validate notification banner
        await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');
        await this.webActions.verifyElementContainsText(this.page.locator('h3'), 'The tribunal has acknowledged a claim against');
        //ET1 link  enabled in notification banner
        await this.page.getByRole('link', {name: 'Respond to the claim'}).waitFor();
        await this.webActions.clickElementByRole('link', {name: 'Respond to the claim'});
        await this.clickStartNow();
    }

    async respondentMakeApplication(option, copyToCorrespondenceFlag) {
        await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');
        await this.webActions.verifyElementContainsText(this.page.locator('h3'), 'The tribunal has acknowledged a claim against');

        await this.webActions.clickElementByRole('link', {name: 'Contact the tribunal about my case'});
        await expect(this.page.locator('#contact-options')).toContainText('Show all sections');
        switch (option) {
            case 'TypeA':
                await this.webActions.clickElementByRole('button', { name: 'Apply to amend my response ,' });
                await this.webActions.clickElementByRole('link', { name: 'Apply to amend my response' });
                break;
            case 'TypeB':
                await this.webActions.clickElementByRole('button', { name: 'I want to change my personal details ,' });
                await this.webActions.clickElementByRole('link', { name: 'I want to change my personal details' });
                break;
            case 'TypeC':
                await this.webActions.clickElementByRole('button', { name: 'Order a witness to give evidence ,' });
                await this.webActions.clickElementByRole('link', { name: 'Order a witness to give evidence' });
                break;
            default:
                throw new Error('... Incorrect input, select correct application type');
        }
        await this.page.locator('#contactApplicationText').isVisible();

        // await this.page.getByRole('textbox', { name: 'Document' }).setInputFiles('empty.pdf');

        await this.page.setInputFiles('#contactApplicationFile',`test/data/test.txt`);
        await this.webActions.clickElementByRole('button', { name: 'Upload file' });
        await expect(this.page.locator('#contactApplicationFile-hint')).toContainText('You have previously uploaded: test.txt');

        // await page.getByRole('button', { name: 'Upload file' }).click();
        await this.webActions.fillField('#contactApplicationText', 'this is respondent application');
        await this.clickContinue();

        if (copyToCorrespondenceFlag) {
            await this.page.locator('#copyToOtherPartyYesOrNo').isVisible();
            await this.webActions.checkElementByLabel('Yes, I confirm I want to copy');
            await this.clickContinue();
        }

        await this.page.waitForSelector('text=Check your answers');
        await this.submitButton();

        await expect(this.page.locator('h1')).toContainText('You have sent your application to the tribunal');
        await this.closeAndReturn();
        await expect(this.page.locator('#main-content')).toContainText('Your request and applications');
    }

    async validateApplication(option){
        await this.webActions.clickElementByRole('link', { name: 'Your request and applications' });
        await expect(this.page.getByRole('caption')).toContainText('Your applications to the tribunal');
        await expect(this.page.locator('tbody')).toContainText('In progress');

        switch (option) {
            case 'TypeA':
                await this.webActions.clickElementByRole('link', { name: 'Amend my response' });
                break;
            case 'TypeB':
                await this.webActions.clickElementByRole('link', { name: 'Change my personal details' });
                break;
            case 'TypeC':
                await this.webActions.clickElementByRole('link', { name: 'Order a witness to attend' });
                break;
            default:
                throw new Error('... Incorrect input, select correct application type');
        }

        await expect(this.page.locator('dl')).toContainText('Respondent');
    }

}
