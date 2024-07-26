
import { Page, expect, Locator } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAsDraftButton:Locator;
  readonly closeAndReturnButton:Locator;
  readonly submit:Locator;
  readonly postcode:Locator;
  readonly findAddress: Locator;



  protected constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
    this.closeAndReturnButton = this.page.getByRole('button', { name: 'Close and Return to case' });
    this.submit = this.page.getByRole('button', { name: 'submit' });
    this.postcode = page.getByRole('textbox', { name: 'Enter a UK postcode' });
    this.findAddress = page.getByRole('button', { name: 'Find address' });
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

  async submitButton(){
    await this.submit.click();
  }

  async enterPostCode(postcode){
    await this.postcode.fill(postcode);
    await this.wait(3000);
    await this.findAddress.click();
    await this.wait(3000);
    await this.page.getByLabel('Select an address').selectOption('1: Object');

  }

}
