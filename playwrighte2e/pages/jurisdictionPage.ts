import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";

export default class JurisdictionPage extends BasePage {
  private readonly jurisdictionDropdown: Locator;
  private readonly judgmentOutcome: Locator;

  constructor(page: Page) {
    super(page);
    this.jurisdictionDropdown = page.locator('#jurCodesCollection_1_juridictionCodesList');
    this.judgmentOutcome = page.locator('#jurCodesCollection_1_judgmentOutcome');
  }

  async addJurisdictionCodeDDA() {
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.jurisdictionDropdown.waitFor();
    await this.jurisdictionDropdown.selectOption({ label: '10: DDA' });
    await this.judgmentOutcome.selectOption({ label: 'Not allocated' });
  }

  async addJurisdictionCode() {
    await this.addJurisdictionCodeDDA();
    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async addADTJurisdictionCode() {
    // add longer than 3 letter jurisdiction code
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.jurisdictionDropdown.waitFor();
    await this.jurisdictionDropdown.selectOption({ label: '3: ADT(ST)' });
    await this.judgmentOutcome.selectOption({ label: 'Not allocated' });

    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async verifyJurisdictionCodeOnTab() {
    await this.page.locator('ccd-read-collection-field').waitFor();
    await expect(this.page.locator('ccd-read-collection-field')).toContainText('DDA');
  }

  async closeJurisdictionCode() {
    await this.page.locator('#jurCodesCollection_0_judgmentOutcome').selectOption({ label: 'Input in error' });
    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }
}
