import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class JurisdictionPage extends BasePage {

  elements = {
    jurisdictionDropdown:'#jurCodesCollection_1_juridictionCodesList'
  }

  async addJurisdictionCode(){
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.jurisdictionDropdown));
    await this.webActions.selectByOptionFromDropDown(this.elements.jurisdictionDropdown, '10: DDA');
    await this.webActions.selectByLabelFromDropDown('#jurCodesCollection_1_judgmentOutcome', 'ACAS conciliated settlement');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async verifyJurisdictionCodeOnTab(){
    await this.page.locator('ccd-read-collection-field').waitFor();
    await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-collection-field'), 'DDA');
  }
}
