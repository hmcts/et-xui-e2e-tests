import {BasePage} from "./basePage";
import { expect, Page } from '@playwright/test';

class RespClaimantDetails extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public static create(page: Page): RespClaimantDetails {
        return new RespClaimantDetails(page);
    }

    elements={
        clickAcasEarlyConciliationLink:'[href="/acas-early-conciliation-certificate"]',
    };

    async et3Section2() {
        await this.earlyConciliationDetails();
        await this.claimantJobDetails();

    }

    async earlyConciliationDetails(){
        await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Your response form (ET3)');
        await this.webActions.clickElementByCss(this.elements.clickAcasEarlyConciliationLink);
        await this.acasEarlyConciliation();
    }

    async acasEarlyConciliation(){
        await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Acas early conciliation certificate');
        await this.page.getByLabel('No').check();

        await this.page.getByLabel('Why do you disagree with the').fill('Test ACAS');
        await this.saveAndContinueButton();
    }

    async claimantJobDetails(){
        await this.claimantEmploymentDates();
        await this.claimantEmploymentContinuing();
        await this.claimantJobTitle();
        await this.claimantAverageWeeklyHours();
        await this.claimantDetailsCya();
        await this.claimantPayDetails();
        await this.claimantNoticeDetails();
        await this.claimantBenefitsDetails();
        await this.claimantDetailsCya();
    }

    async claimantEmploymentDates(){
        await this.page.getByLabel('No', { exact: true }).check();
        await this.saveAndContinueButton();
        await this.page.getByRole('group', { name: 'Employment start date (' }).getByLabel('Day').fill('1');
        await this.page.getByRole('group', { name: 'Employment start date (' }).getByLabel('Month').fill('1');
        await this.page.getByRole('group', { name: 'Employment start date (' }).getByLabel('Year').fill('2024');
        await this.saveAndContinueButton();
    }

    async claimantEmploymentContinuing(){
        await this.webActions.checkElementByLabel('Yes');
        await this.saveAndContinueButton();
    }

    async claimantJobTitle(){
        await this.page.getByLabel('No', { exact: true }).check();
        await this.page.getByLabel('What is or was the claimant’s').fill('Tester');
        await this.saveAndContinueButton();
    }

    async claimantAverageWeeklyHours(){
        await this.page.getByLabel('No', { exact: true }).check();
        await this.page.getByLabel('What are the claimant’s').fill('40');
        await this.saveAndContinueButton();
    }

    async claimantDetailsCya(){
        await this.page.getByLabel('Yes, I’ve completed this').check();
        await this.saveAndContinueButton();
    }

    async claimantPayDetails(){
        await this.page.getByLabel('No', { exact: true }).check();
        await this.saveAndContinueButton();
        await this.page.getByLabel('Monthly').check();
        await this.page.getByLabel('Enter the claimant’s pay').fill('3500');
        await this.page.getByLabel('Enter the claimant’s normal').fill('2700');
        await this.saveAndContinueButton();
    }

    async claimantNoticeDetails(){
        await this.page.getByLabel('Yes').check();
        await this.saveAndContinueButton();
    }

    async claimantBenefitsDetails(){
        await this.page.getByLabel('Not applicable').check();
        await this.saveAndContinueButton();
    }

}

export default RespClaimantDetails;