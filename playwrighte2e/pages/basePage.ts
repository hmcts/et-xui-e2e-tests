import { Locator, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';

export abstract class BasePage {
  readonly page: Page;
  readonly saveAsDraftButton: Locator;
  readonly closeAndReturnButton: Locator;
  readonly applyFilterButton: Locator;
  readonly addNewBtn: Locator;
  readonly newHearingBtn: string;
  readonly newUploadDocBtn: Locator;
  readonly webActions: WebAction;

  constructor(page: Page) {
    this.page = page;

    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
    this.closeAndReturnButton = this.page.getByRole('button', { name: 'Close and Return to case' });
    this.applyFilterButton = this.page.getByRole('button', { name: 'Apply filter' });
    this.addNewBtn = page.getByRole('button', { name: 'Add new' });
    this.newHearingBtn = '#hearingCollection > div > button.button.write-collection-add-item__bottom.ng-star-inserted';
    this.newUploadDocBtn = page.locator('//*[@id="documentCollection"]/div/button[2]');
    this.webActions = new WebAction(this.page);
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async clickContinue() {
    await this.webActions.clickElementByRole('button', { name: 'Continue' });
  }

  async saveAsDraft() {
    await this.saveAsDraftButton.click();
  }

  async clickCloseAndReturn() {
    await this.closeAndReturnButton.click();
  }

  async clickSubmitButton() {
    await this.webActions.clickElementByRole('button', { name: 'Submit' });
    await this.page.waitForLoadState('load', { timeout: 5000 });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async clickNextButton() {
    await this.webActions.clickElementByRole('button', { name: 'Next' });
  }

  async clickShareCaseButton() {
    await this.webActions.clickElementByRole('button', { name: ' Share Case ' });
  }

  async clickElement(elementLocator: string): Promise<void> {
    await this.page.click(elementLocator);
  }

  async enterPostCode(postcode: string) {
    await this.webActions.fillFieldByRole('textbox', { name: 'Enter a UK postcode' }, postcode);
    await this.delay(3000);
    await this.webActions.clickElementByRole('button', { name: 'Find address' });
    await this.delay(3000);
    await this.page.getByLabel('Select an address').selectOption('2: Object');
    await this.delay(3000);
  }

  async signoutButton() {
    await this.webActions.clickElementByText('Sign out');
  }

  async signOutButtonSyr() {
    await this.webActions.clickElementByRole('link', { name: 'Sign out' });
  }

  async clickStartNow() {
    await this.webActions.clickElementByRole('button', { name: 'Start now' });
  }

  async saveAndContinueButton() {
    await this.webActions.clickElementByRole('button', { name: 'Save and continue' });
  }

  async addNewButtonClick() {
    await this.addNewBtn.click();
  }

  async addNewHearingButtonClick() {
    await this.webActions.clickElementByCss(this.newHearingBtn);
  }

  async addNewUploadDocButtonClick() {
    await this.newUploadDocBtn.click();
  }

  async addRespondentButton() {
    await this.webActions.clickElementByRole('button', { name: 'Add another respondent' });
  }

}
