
import { Page, expect, Locator } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAsDraftButton:Locator;
  readonly closeAndReturnButton:Locator;


  protected constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
    this.closeAndReturnButton = this.page.getByRole('button', { name: 'Close and Return to case' })
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async saveAsDraft() {
    await this.saveAsDraftButton.click();
  }

  async closeAndReturn() {
    await this.closeAndReturnButton.click();
  }

}
