import { BasePage } from "./basePage";
import { expect, Locator, Page } from '@playwright/test';

export default class ManageSupportPage extends BasePage {
  private readonly caseFlagField: Locator;

  constructor(page: Page) {
    super(page);

    this.caseFlagField = page.locator('ccd-read-case-flag-field');
  }

  async validateSupportFlag(){
      await expect(this.caseFlagField).toContainText('Guidance on how to complete forms');
       await expect(this.caseFlagField).toContainText('Requested');
    await expect(this.caseFlagField).toContainText('Step free / wheelchair access');
    await expect(this.caseFlagField).toContainText('Active');
  }


}
