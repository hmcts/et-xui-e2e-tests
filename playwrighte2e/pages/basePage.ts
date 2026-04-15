import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly saveAsDraftButton: Locator;
  readonly closeAndReturnButton: Locator;
  readonly applyFilterButton: Locator;
  readonly addNewBtn: Locator;
  readonly newHearingBtn: string;
  readonly newUploadDocBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
    this.closeAndReturnButton = this.page.getByRole('button', { name: 'Close and Return to case' });
    this.applyFilterButton = this.page.getByRole('button', { name: 'Apply filter' });
    this.addNewBtn = page.getByRole('button', { name: 'Add new' });
    this.newHearingBtn = '#hearingCollection > div > button.button.write-collection-add-item__bottom.ng-star-inserted';
    this.newUploadDocBtn = page.locator('//*[@id="documentCollection"]/div/button[2]');
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async clickContinue() {
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await this.page.waitForLoadState('load');
      const error = this.page.getByRole('heading', { name: ' The event could not be created ', level: 3 });
      // Check if error is visible
      if (await error.isVisible().catch(() => false)) {
        attempt++;
        console.log(`Error detected after clicking Continue. Retrying... (Attempt ${attempt})`);
        await this.page.waitForTimeout(1000); // wait 1s before retry
      } else {
        // No error, break out of loop
        break;
      }
    }
    if (attempt === maxRetries) {
      console.warn('Continue button retried maximum times, but error still present.');
    }
  }

  async saveAsDraft() {
    await this.saveAsDraftButton.click();
  }

  async clickCloseAndReturn() {
    await this.closeAndReturnButton.click();
  }

  async clickSubmitButton() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.waitForLoadState('load', { timeout: 5000 });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async clickNextButton() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async clickShareCaseButton() {
    await this.page.getByRole('button', { name: ' Share Case ' }).click();
  }

  async clickElement(elementLocator: string): Promise<void> {
    await this.page.click(elementLocator);
  }

  async enterPostCode(postcode: string) {
    await this.page.getByRole('textbox', { name: 'Enter a UK postcode' }).fill(postcode);
    await this.delay(3000);
    await this.page.getByRole('button', { name: 'Find address' }).click();
    await this.delay(3000);
    await this.page.getByLabel('Select an address').selectOption('2: Object');
    await this.delay(3000);
  }

  async signoutButton() {
    await this.page.getByText('Sign out').click();
  }

  async signOutButtonSyr() {
    await this.page.getByRole('link', { name: 'Sign out' }).click();
  }

  async clickStartNow() {
    await this.page.getByRole('button', { name: 'Start now' }).click();
  }

  async saveAndContinueButton() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
  }

  async addNewButtonClick() {
    await this.addNewBtn.click();
  }

  async addNewHearingButtonClick() {
    await this.page.locator(this.newHearingBtn).click();
  }

  async addNewUploadDocButtonClick() {
    await this.newUploadDocBtn.click();
  }

  async addRespondentButton() {
    await this.page.getByRole('button', { name: 'Add another respondent' }).click();
  }
}
