import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class BfActionPage extends BasePage {

  elements = {
    bfActionDropDown: '#bfActions_0_cwActions',
    bfDate:'#bfDate-day',
    bfMonth:'#bfDate-month',
    bfYear:'#bfDate-year'
  }
  async addBfAction() {
    await this.webActions.verifyElementContainsText(this.page.locator('ccd-case-edit-page'), 'B/F Action');
    await this.webActions.clickElementByRole('button', { name: 'Add new' });
    await this.webActions.selectByLabelFromDropDown(this.elements.bfActionDropDown, 'Application of letter to ACAS/RPO');
    await this.webActions.fillField(this.elements.bfDate, '11');
    await this.webActions.fillField(this.elements.bfMonth, '09');
    await this.webActions.fillField(this.elements.bfYear, '2024');
    await this.webActions.fillField('#bfActions_0_notes', 'bf action test');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'BF Actions' })).toBeVisible();
    console.log('...BF action event completed successfully...')
  }
}
