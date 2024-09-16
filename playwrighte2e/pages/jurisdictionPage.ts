import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class JurisdictionPage extends BasePage {

  elements = {
    bfActionDropDown: '#bfActions_0_cwActions',
    bfDate:'#bfDate-day',
    bfMonth:'#bfDate-month',
    bfYear:'#bfDate-year'
  }
  async addBfAction() {
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('B/F Action');
    await this.page.getByRole('button', { name: 'Add new' }).click();
    await this.page.locator('#bfActions_0_cwActions').selectOption('Application of letter to ACAS/RPO');
    await this.page.locator(this.elements.bfDate).fill('11');
    await this.page.locator(this.elements.bfMonth).fill('09');
    await this.page.locator(this.elements.bfYear).fill('2024');
    await this.page.locator('#bfActions_0_notes').fill('bf action test');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'BF Actions' })).toBeVisible();
    console.log('...BF action event completed successfully...')
  }
}
