import { BasePage } from "./basePage";
import {expect} from "@playwright/test";
import { CaseEvent } from '../helpers/case-data';

export default class CaseDetailsPage extends BasePage {
    async addVPCaseFlag() {
        await this.webActions.waitForElementToBeVisible('text=Managing Office');
        await this.webActions.selectByOptionFromDropDown('#allocatedOffice', '1: Glasgow');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Single or Multiple');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Speak to VP (Optional)');
        await this.webActions.checkElementById('#additionalCaseInfo_interventionRequired_Yes');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Check your answers');
        await this.clickSubmitButton();

        await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
        await expect(this.page.getByText('SPEAK TO VP', { exact: true })).toBeVisible();
    }

  async checkHasBeenCreated(event: CaseEvent) {
      await expect(this.page.locator('//div[@class="alert-message"]')).toBeVisible();
      const successMessage = this.page.getByText(`has been updated with event: ${event.listItem}`);
      await expect(successMessage).toBeVisible();
  }

}
