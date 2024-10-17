import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class JurisdictionPage extends BasePage {

  elements = {
    jurisdictionDropdown:'#jurCodesCollection_1_juridictionCodesList'
  }

  async addJurisdictionCode(){
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await expect(this.page.locator(this.elements.jurisdictionDropdown)).toBeVisible();
    await this.page.locator(this.elements.jurisdictionDropdown).selectOption('10: DDA');
    await this.page.locator('#jurCodesCollection_1_judgmentOutcome').selectOption('ACAS conciliated settlement');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async verifyJurisdictionCodeOnTab(){
    await expect(this.page.locator('ccd-read-collection-field')).toContainText('DDA');
  }
}
