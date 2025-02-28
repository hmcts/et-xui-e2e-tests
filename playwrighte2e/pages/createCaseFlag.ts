import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class CreateCaseFlag extends BasePage {

    elements = {}

    async createCaseFlag() {
        await this.webActions.waitForLabelToBeVisible('Case level');
        await this.webActions.checkElementByLabel('Case level');
        await this.clickNextButton();
        await this.webActions.checkElementByLabel('Urgent case');
        await this.webActions.checkElementByLabel('RRO (Restricted Reporting');
        await this.webActions.checkElementByLabel('Urgent case');
        await this.clickNextButton();
        await this.webActions.clickElementByLabel('Add comments for this flag');
        await this.page.getByLabel('Add comments for this flag').fill('This is an urgent case.');
        await this.clickNextButton();

        await this.submitButton();
        await expect(this.page.getByLabel('Important').getByRole('paragraph')).toContainText(' There is 1 active flag on this case. View case flags');
        await this.webActions.clickElementByRole('link', {name: 'View case flags'});
        await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-case-flag-field'), 'Urgent case');
        await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-case-flag-field'), 'Active');
    }

}
