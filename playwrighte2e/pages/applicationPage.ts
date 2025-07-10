import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";

export default class applicationPage extends BasePage {

  readonly applicationTab: Locator;
  readonly makeAnApplicationLink: Locator;
  readonly applicationType:Locator;
  readonly r92Yes:Locator;
  readonly r92No:Locator;
  readonly r92NoDetailsTextbox:Locator;

  protected constructor(page: Page) {
    // @ts-ignore
    super();
    this.applicationTab = page.getByText('Applications');
    this.makeAnApplicationLink = page.getByRole('link', { name: 'Make an application' });
    this.applicationType = page.getByLabel('Select an application');
    this.r92Yes = page.getByLabel('Yes, I confirm I will copy');
    this.r92No = page.getByLabel('No, I do not want to copy');
    this.r92NoDetailsTextbox = page.getByLabel('Give details');
  }

  elements = {}

  async clickApplicationTab() {
    await this.applicationTab.click();
  }

  async navigateMakeAnApplicationLink() {
    await this.makeAnApplicationLink.click();
  }

  async makeAnApplicationR92WithYesOption(r92Option:String){
  await this.applicationType.selectOption('1: Amend claim');
  await this.clickContinue();

  await expect(this.page.getByLabel('Cannot continue because the')).toContainText('Errors Please upload a document or provide details in the text box.');
  await this.page.getByLabel('Use this box for any').fill('abc');
  await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Make an Application');
    await expect(this.page.locator('h3')).toContainText('To copy this correspondence to the other party, you must send it to them by post or email. They cannot view it in this service.');

    if(r92Option==='Yes') {
      await this.r92Yes.check();
    } else {
      await this.r92No.check();
      await this.r92NoDetailsTextbox.click();
      await this.r92NoDetailsTextbox.fill('R92 with No option');
    }
    await this.clickContinue();

    await expect(this.page.locator('ccd-read-fixed-list-field')).toContainText('Amend claim');
    await this.submitButton();

    await expect(this.page.locator('#confirmation-body')).toContainText('You must submit your application after copying the correspondence to the other party.');
    await expect(this.page.locator('h3')).toContainText('Download a copy of your application');
    await this.closeAndReturn();
    await expect(this.page.locator('cut-alert')).toContainText('Make an Application');
    await this.signoutButton();
  }
}
