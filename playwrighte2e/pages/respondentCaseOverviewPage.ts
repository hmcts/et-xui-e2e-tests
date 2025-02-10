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
        await expect(this.page.locator('#main-content')).toContainText('Case overview');
        await expect(this.page.locator('h3')).toContainText('The tribunal has acknowledged a claim against');
        //await this.elements.et1FormLink.click();
        //await expect(this.page.locator('h1')).toContainText('The claimant’s ET1 claim documents');
        //await this.page.getByLabel('view ET1 - et citizen1.pdf').click();
        // await this.page.getByRole('link', {name: 'Back', exact: true}).click();

        //ET1 link  enabled in notification banner
        await this.page.getByRole('link', {name: 'Respond to the claim'}).waitFor();
        await this.page.getByRole('link', {name: 'Respond to the claim'}).click();
        await this.clickStartNow();

    }

}
