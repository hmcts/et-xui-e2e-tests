import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class CreateCaseFlag extends BasePage {

    elements = {}

    async createCaseFlag() {
        await this.page.getByLabel('Case level').waitFor();
        await this.page.getByLabel('Case level').check();
        await this.clickNextButton();

        await this.page.getByLabel('Urgent case').check();
        await this.page.getByLabel('RRO (Restricted Reporting').check();
        await this.page.getByLabel('Urgent case').check();
        await this.clickNextButton();

        await this.page.getByLabel('Add comments for this flag').click();
        await this.page.getByLabel('Add comments for this flag').fill('This is an urgent case.');
        await this.clickNextButton();

        await this.submitButton();

        await expect(this.page.getByLabel('Important').getByRole('paragraph')).toContainText(' There is 1 active flag on this case. View case flags');
        await this.page.getByRole('link', {name: 'View case flags'}).click();
        await expect(this.page.locator('ccd-read-case-flag-field')).toContainText('Urgent case');
        await expect(this.page.locator('ccd-read-case-flag-field')).toContainText('Active');
    }

}
