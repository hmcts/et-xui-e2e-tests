import { expect, Page } from '@playwright/test';
import {BasePage} from "./basePage";
export default class RespondentCaseOverviewPage extends BasePage {

    protected constructor(page: Page) {
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
        await this.elements.et1FormLink.click();
        await expect(this.page.getByRole('caption')).toContainText('Claim related information');
        await this.elements.et1FormSubLink.isEnabled();

        //ET1 link  enabled in notification banner
        await this.page.getByRole('link', {name: 'Back', exact: true}).click();
        await this.page.getByRole('link', {name: 'Respond to the claim'}).click();
        await expect(this.page.getByRole('heading')).toContainText('Response to ET1 employment tribunal claim (ET3)');
        await this.clickStartNow();

    }

}
