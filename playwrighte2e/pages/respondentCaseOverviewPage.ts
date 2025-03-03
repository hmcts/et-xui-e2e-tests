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

}
